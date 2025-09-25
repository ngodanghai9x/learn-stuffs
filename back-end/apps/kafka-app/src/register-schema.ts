// registry.ts
import { SchemaRegistry, COMPATIBILITY, SchemaType } from '@kafkajs/confluent-schema-registry';
import fs from 'fs';
import path from 'path';

const filePath =
    '/home/gem/Documents/MyRepo/learn-stuffs/back-end/apps/kafka-app/src/schemas/order.avsc';

const getFileName = (filePath: string) => {
    return path.basename(filePath);
};

const registry = new SchemaRegistry({
    host: 'http://localhost:8081', // Schema Registry URL
});

export function loadSchemaFromFile(filePath: string) {
    const absPath = path.resolve(filePath);
    const schemaContent = fs.readFileSync(absPath, 'utf-8');

    return schemaContent;
    // return JSON.parse(schemaContent);
}

/**
 * Register schema only once.
 * Next calls return existing schemaId (no duplicate register).
 */
export async function ensureSchema(schemaPath: string): Promise<{
    orderSchemaId: number | string;
}> {
    const subject = getFileName(schemaPath);
    try {
        // Try to get latest schema
        const orderSchemaId = await registry.getLatestSchemaId(subject);
        return { orderSchemaId };
    } catch (err) {
        // If not found → register new schema
        const { id: orderSchemaId } = await registry.register(
            {
                // type: 'AVRO',
                type: SchemaType.AVRO,
                // schema: JSON.stringify(schemaObj),
                schema: loadSchemaFromFile(schemaPath),
            },
            { subject, compatibility: COMPATIBILITY.BACKWARD },
        );
        return { orderSchemaId };
    }
}

export { registry };
