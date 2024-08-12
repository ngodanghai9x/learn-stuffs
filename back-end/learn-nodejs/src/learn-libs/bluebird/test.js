const BPromise = require('bluebird');
const os = require('os');

const cpuLength = os.cpus().length;
console.log('🚀 ~ file: test.js:5 ~ cpuLength:', cpuLength);

function sleep(millSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('sleep: ', millSeconds);
      resolve(millSeconds);
    }, millSeconds);
  });
}

// BPromise.map(['one', 'two', 'three'], (item) => {
//   return dbQuery(item);
// }).then((transformed) => {
//   // transformed is now an array of results from dbQuery
// });

function bootstrap() {
  // const promises = [2,1,3].map(num => {
  //   return sleep.bind(null, num * 1000);
  // });
  const promises = [2, 1, 3].map((num) => {
    return () => sleep(num * 1000);
  });
  BPromise.map(
    promises.map((cb) => cb()),
    (ms) => sleep(ms / 10),
    { concurrency: 1 },
  );
}

bootstrap();
