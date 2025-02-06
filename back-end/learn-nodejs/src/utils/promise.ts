import { sleep } from './sleep';

export const MAX_TRY = 3;
export const DELAY_TIME = 1000;

/**
 * Retries a promise maxTry times before rejecting.
 * @promise A promise to resolve
 * @maxTry Number of tries before rejecting
 * @delayTime Delay time in milliseconds
 */
export async function retryPromise<T>(
  promise: (...args: unknown[]) => Promise<T>,
  maxTry: number = MAX_TRY,
  delayTime: number = DELAY_TIME,
): Promise<T> {
  return await promise().catch(async (e) => {
    if (maxTry === 0) {
      return Promise.reject(e);
    }
    console.log('retrying promise', promise.name, maxTry, 'time');
    await sleep(delayTime);
    return retryPromise<T>(promise, maxTry - 1, delayTime);
  });
}

async function promiseFunc() {
  console.log('🚀run promise');
  await sleep(500);
  return 'done';
}
async function promiseFunc2(a: string, b: number) {
  console.log('🚀run promise2', a, b);
  await sleep(500);
  throw new Error('2');
  return 'done';
}

async function run() {
  await Promise.allSettled([
    retryPromise(promiseFunc, 3, 100),
    retryPromise(() => promiseFunc2('2a', 123), 3, 100),
  ]);
}

void run();


// Biến này dùng để theo dõi số Promise đang được thực thi tại một thời điểm
let counter = 0;
let interval;
// Tổng số hành động
const numberOfOperations = 25;
// Arguments cho mỗi hành động
const listOfArguments = [];
// Delay các hành động để fake bất đồng bộ
const listOfDelays = [];

// Fill mảng argument và delay cho các hành động được thực thi
// Mỗi giá trị delay được ngẫu nhiên trong khoảng 1000 tới 10000 milisecond
for (let i = 0; i < numberOfOperations; i++) {
  listOfArguments.push(i);
  listOfDelays.push(Math.ceil(Math.random() * 9) * 1000);
}

// Fake bất đồng bộ: resolve một mảng sau một khoảng thời gian tuỳ ý
// Tăng biến counter để theo dõi số promise được thực thi mỗi giây
const asyncOperation = index => {
  counter++;
  return new Promise(resolve =>
    setTimeout(() => {
      console.log('Operation performed:', index);
      counter--;
      resolve(index);
    }, listOfDelays[index]))
};

// Hàm in ra số Promise được thực thi mỗi giây (để theo dõi)
const watchCounter = () => {
  console.log('Promises running in the beginning:', counter);

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => console.log('Promises running:', counter), 1000);
};