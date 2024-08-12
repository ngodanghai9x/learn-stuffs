'use strict';
const http = require('http'),
  cluster = require('cluster'),
  cpusLength = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpusLength; i++) {
    cluster.fork();
    console.log(`The Worker number: ${i + 1} is alive`);
  }
  cluster.on('exit', (worker) => {
    console.log(`The Worker number: ${worker.id} has died`);
  });
} else {
  // các cluster sẽ cùng lắng 1 port
  http
    .createServer((sol, res) => {
      res.end('Hi, we are harnessing the power of clusters :)');
    })
    .listen(3000, () => console.log('The server is running on the port:3000'));
  console.log(`The Worker number: ${cluster.worker.id} is running`);
}
