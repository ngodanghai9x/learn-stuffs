// producer.js
const amqp = require('amqplib');

async function producer() {
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();

    const EXCHANGE = 'logs';

    // Khai báo exchange fanout
    await ch.assertExchange(EXCHANGE, 'fanout', { durable: false });

    // Publish message
    const msg = `Hello at ${new Date().toISOString()}`;
    ch.publish(EXCHANGE, '', Buffer.from(msg)); // routingKey bị bỏ qua với fanout
    console.log(' [x] Sent:', msg);

    setTimeout(() => {
        conn.close();
        process.exit(0);
    }, 500);
}

producer().catch(console.error);
