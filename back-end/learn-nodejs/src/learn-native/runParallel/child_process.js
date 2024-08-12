const BPromise = require('bluebird');
const os = require('os');
const fs = require('os');
const child_process = require('child_process');
const { spawn } = child_process;
const cpuLength = os.cpus().length;

const processCb = (feature) => {
  return new BPromise((resolve, reject) => {
    let log = '';
    const options = [
      'node_modules/@cucumber/cucumber/bin/cucumber.js',
      '--require-module',
      '@babel/register',
      'src/features/' + feature,
      '--format',
      'json:reports/' + feature + '.report.json',
    ];
    const process = spawn('node', options);
    process.stdout.on('data', (data) => {
      log = log + '\n' + data;
    });
    process.stderr.on('data', (data) => {
      log = log + '\n' + data;
    });
    process.on('exit', () => {
      console.log(log);
      resolve();
    });
  });
};

function bootstrap() {
  if (!fs.existsSync(process.cwd() + '/reports')) {
    fs.mkdirSync(process.cwd() + '/reports');
  }

  const fileList = [];
  const dir = process.cwd() + '/src/features';
  fs.readdirSync(dir).forEach((file) => {
    if (file.includes('.feature')) {
      fileList.push(file);
    }
  });

  const promises = fileList.map((file) => {
    return processCb.bind(null, file);
  });

  BPromise.map(
    promises,
    (cb) => {
      return cb();
    },
    { concurrency: cpuLength },
  );
}

bootstrap();
