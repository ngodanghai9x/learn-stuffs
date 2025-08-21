// consumer.js
const amqp = require('amqplib');

async function consume(queueName, exchange) {
    // Start 2 consumer: `node consumer.js`
    // Bạn sẽ thấy 2 queue queue1 và queue2 được tạo.
    // Gửi message từ producer: `node producer.js`
    // Output: cả queue1 và queue2 đều nhận được bản sao message.

    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();

    // Khai báo exchange fanout
    await ch.assertExchange(exchange, 'fanout', { durable: false });

    // Tạo queue riêng cho consumer này
    const q = await ch.assertQueue(queueName, { exclusive: false });

    // Bind queue vào exchange fanout
    await ch.bindQueue(q.queue, exchange, '');

    console.log(` [*] Waiting for messages in ${q.queue}`);

    // Nhận message
    ch.consume(
        q.queue,
        (msg) => {
            if (msg.content) {
                console.log(`[${queueName}] Received:`, msg.content.toString());
            }
        },
        { noAck: true },
    );
}

async function consumeShared(queueName, exchange, consumerName) {
    // Producer gửi 5 message:
    // Consumer C1 nhận msg 1,3,5
    // Consumer C2 nhận msg 2,4
    // Không consumer nào nhận toàn bộ message.

    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();

    await ch.assertExchange(exchange, 'fanout', { durable: false });
    await ch.assertQueue(queueName, { exclusive: false });
    await ch.bindQueue(queueName, exchange, '');

    console.log(`[${consumerName}] Waiting for messages in ${queueName}`);

    ch.consume(
        queueName,
        (msg) => {
            console.log(`[${consumerName}] Received: ${msg.content.toString()}`);
        },
        { noAck: true },
    );
}

// Cả 2 consumer listen cùng 1 queue "shared-queue"
consumeShared('shared-queue', 'logs', 'C1').catch(console.error);
consumeShared('shared-queue', 'logs', 'C2').catch(console.error);

// Chạy 2 consumer
consume('queue1', 'logs').catch(console.error);
consume('queue2', 'logs').catch(console.error);
