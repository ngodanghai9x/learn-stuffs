import { Worker, WorkerOptions } from 'worker_threads';
import { join } from 'path';

// | Thuộc tính          | Ý nghĩa                                                                       | Ví dụ giá trị                     |
// | ------------------- | ----------------------------------------------------------------------------- | --------------------------------- |
// | `workerData`        | Dữ liệu gửi sẵn cho worker lúc tạo                                            | `{ name: 'haind' }`               |
// | `stdout` / `stderr` | Nếu `true`, cho phép đọc log của worker qua `worker.stdout` / `worker.stderr` | `true`                            |
// | `execArgv`          | Tham số CLI cho Node.js worker                                                | `['--max-old-space-size=1024']`   |
// | `resourceLimits`    | Giới hạn CPU/memory worker                                                    | `{ maxOldGenerationSizeMb: 100 }` |
// | `env`               | Biến môi trường riêng cho worker                                              | `{ VAR: 'value' }`                |
// | `argv`              | Tham số argv riêng (ít dùng)                                                  | `['arg1', 'arg2']`                |

export function runWorker(
    task: string,
    data: any,
    options: WorkerOptions = {
        workerData: { name: 'haind' },
        stdout: true, // Lấy worker.stdout
        stderr: true, // Lấy worker.stderr
        // execArgv: ['--max-old-space-size=256'],
        resourceLimits: { maxOldGenerationSizeMb: 50 },
        env: { NODE_ENV: 'production' },
    },
): Promise<any> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(join(__dirname, './worker/index.js'), options); // phai build ra js trc
        worker.postMessage({ task, data });

        worker.on('message', (msg) => {
            // console.log("🚀 ~ worker.on ~ msg:", msg)
            if (msg.status === 'success') {
                resolve(msg.result);
            } else {
                reject(new Error(msg.message));
            }
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });

        if (worker.stdout) {
            worker.stdout.on('data', (data) => console.log('[worker stdout]', data.toString()));
        }
        if (worker.stderr) {
            worker.stderr.on('data', (data) => console.error('[worker stderr]', data.toString()));
        }
    });
}
