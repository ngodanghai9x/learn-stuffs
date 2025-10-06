// producer.ts
import { Kafka } from 'kafkajs';
import { registry, ensureSchema, loadSchemaFromFile } from './register-schema';

async function runProducer() {
    const kafka = new Kafka({
        clientId: 'order-service',
        brokers: ['localhost:9092', 'localhost:9094'],
    });
    const producer = kafka
        .producer
        //         {
        //   createPartitioner: Partitioners.LegacyPartitioner,
        // }
        ();
    await producer.connect();

    // Load schema từ file avsc
    // const orderSchema = loadSchemaFromFile('./schemas/orders.avsc');
    // const subject = 'orders-value';

    // Đảm bảo schema được register
    // const { orderSchemaId } = await ensureSchema('./src/schemas/order.avsc');
    // console.log('🚀 ~ runProducer ~ orderSchemaId:', orderSchemaId);

    // Encode message
    const payload = {
        orderId: 'A123' + Date.now(),
        amount: 99.5,
        //  status: 'NEW'
    };
    // const encoded = await registry.encode(+orderSchemaId, payload);
    // console.log('🚀 ~ runProducer ~ encoded:', encoded);

    await producer.send({
        topic: 'orders-topic',
        // messages: [{ value: encoded }],
        messages: [{ 
            value: JSON.stringify(payload), 
            key: payload.orderId
        }],
    });

    console.log('Message sent with schemaId:', true);

    await producer.disconnect();
}

runProducer().catch(console.error);
