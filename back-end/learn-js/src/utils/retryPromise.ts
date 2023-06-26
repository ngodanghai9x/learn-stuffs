export {};

/**
 * Util function to return a promise which is resolved in provided milliseconds
 */
function sleep(millSeconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, millSeconds);
  });
}

/**
 * @param promise A promise to resolve
 * @maxTry Number of tries before rejecting
 * @delayTime Delay time in milliseconds
 * @desc Retries a promise n no. of times before rejecting.
 * @returns resolved promise
 */
export async function retryPromise<T>(
  promise: (...args: unknown[]) => Promise<T>,
  // args: number[],
  maxTry: number,
  delayTime: number
): Promise<T> {
  // Awaited<T> | Promise<T> | Promise<any>
  // console.log('🚀1 ~ retryPromise', promise);
  return await promise()
    .then((data) => data)
    .catch(async (e) => {
      if (maxTry === 0) {
        return Promise.reject(e);
      }
      console.log("retrying", maxTry, "time");
      await sleep(delayTime);
      // console.log('🚀2 ~ retryPromise', promise);
      return retryPromise<T>(promise, maxTry - 1, delayTime);
      // return retryPromise<T>(() => promise('2a-new', 321), maxTry - 1, delayTime);
    });

  // try {
  //   const data = await promise;
  //   return data;
  // } catch (e) {
  // if (maxTry === 0) {
  //   return Promise.reject(e);
  // }
  // console.log('retrying', maxTry, 'time');
  // await waitFor(delayTime);
  // return retryPromise<T>(promise, maxTry - 1, delayTime);
  // }
}

async function promise() {
  console.log("🚀run promise");
  await sleep(500);
  return "done";
}
async function promise2(a: string, b: number) {
  console.log("🚀run promise2", a, b);
  await sleep(500);
  throw new Error("2");
  return "done";
}

async function run() {
  await Promise.allSettled([
    retryPromise(promise, 3, 100),
    retryPromise(() => promise2("2a", 123), 3, 100),
  ]);
}

void run();
