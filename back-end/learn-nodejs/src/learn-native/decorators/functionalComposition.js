function doBusinessJob(arg) {
  console.log('do my job', arg);
}

function logDecorator(job) {
  return function() {
    console.log('start my job');
    const result = job.apply(this, arguments);
    return result;
  }
}

const logWrapper = logDecorator(doBusinessJob);
logWrapper('abc')

