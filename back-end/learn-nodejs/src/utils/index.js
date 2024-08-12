const fs = require('fs');

const readFilePromise = async (path) => {
  // async function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        setTimeout(() => resolve(data), 1000);
      }
    });
  });
}

console.log("--------- start ---------")

// readFilePromise('text.txt')
//   .then((result) => console.log('readFilePromise: ', result))
//   .catch((err) => console.log('readFilePromise err: ', err))
//   ;

// Promise.all([
//   readFilePromise('text2.txt'),
//   readFilePromise('text.txt')
// ])
//   .then((values) => {
//     console.log('Promise.all ', values);
//   })
//   .catch(err => console.log('Promise.all ', err))

async function runAsync() {
  console.log("start runAsync ");
  let content1 = readFilePromise('text.txt');
  console.log("content1 ", content1);
  console.log("almost end runAsync ");
  let content2 = readFilePromise('text2.txt');
  await console.log("runAsync ", content1, content2);
  console.log("runAsync ", await content1, await content2);
  console.log("end runAsync ");
}

runAsync();

// let content = fs.readFileSync('text.txt', { encoding: 'utf8' });
// console.log("readFileSync: ", content)

console.log("--------- end ---------")

