import { getFile, saveFile } from './worker/tasks';
import { runWorker } from './workerRunner';
import { join } from 'path';

async function main() {
        try {
        console.time('main1_normal_run');
        const filePath = join(__dirname, 'tmp', 'test.txt');

        // Test saveFile
        const content = Buffer.from('Hello from worker!').toString('base64');
        const saveResult = saveFile({ path: filePath, content });
        console.log('saveFile result:', saveResult);

        // Test getFile
        const readResult = getFile({ path: filePath });
        await Promise.all([readResult, saveResult])
        console.log('getFile result:', readResult);
        console.timeEnd('main1_normal_run');
    } catch (err: any) {
        console.error('Error:', err.message);
    }
}
async function mainThreads() {
    try {
        console.time('main2_parallel_run');
        const filePath = join(__dirname, 'tmp', 'test.txt');

        // Test saveFile
        const content = Buffer.from('Hello from worker!').toString('base64');
        const saveResult = runWorker('saveFile', { path: filePath, content });
        console.log('saveFile result:', saveResult);
        
        // Test getFile
        const readResult = runWorker('getFile', { path: filePath });
        await Promise.all([readResult, saveResult])
        console.log('getFile result:', readResult);
        console.timeEnd('main2_parallel_run');
    } catch (err: any) {
        console.error('Error:', err.message);
    }
}

mainThreads();
// main();
