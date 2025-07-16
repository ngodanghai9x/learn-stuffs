import { parentPort } from 'worker_threads';
import * as tasks from './tasks';

parentPort!.on('message', async (job) => {
    const { task, data } = job;
    try {
        if (typeof (tasks as any)[task] !== 'function') {
            throw new Error(`Unknown task: ${task}`);
        }
        const result = await (tasks as any)[task](data);
        parentPort!.postMessage({ status: 'success', result });
    } catch (err: any) {
        parentPort!.postMessage({ status: 'error', message: err.message });
    }
});
