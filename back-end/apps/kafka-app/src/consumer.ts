// consumer.ts
import { Kafka } from 'kafkajs';
import { registry } from './register-schema';

async function runConsumer() {
    const kafka = new Kafka({
        clientId: 'order-consumer',
        // brokers: ['0.0.0.0:9092', '0.0.0.0:9093'],
        brokers: ['localhost:9092', 'localhost:9094'],
    });
    const consumer = kafka.consumer({ groupId: 'orders-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'orders-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!message.value) return;
            // Decode using schemaId embedded in payload
            const decoded = await registry.decode(message.value);
            console.log('Decoded order:', decoded);
        },
    });
}

runConsumer();
// .catch(console.error);
