var successFunc = async () => {
  return new Promise((resolve, reject) => {
    resolve('success');
  });
};

var failFunc = async () => {
  return new Promise((resolve, reject) => {
    reject('fail');
  });
};

function sleep(millSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('sleep: ', millSeconds);
      resolve(null);
    }, millSeconds);
  });
}

async function runPromiseAll() {
  console.time('exec-runPromiseAll');
  try {
    const promises = [];
    promises.push(sleep(3000));
    promises.push(sleep(1000));
    promises.push(sleep(2100));
    await Promise.all(promises);
    return await sleep(2000);
  } catch (error) {
  } finally {
    console.timeEnd('exec-runPromiseAll');
  }
}
runPromiseAll();
return console.log('THE END');

var resolve = Promise.resolve('success');
function resolve2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      throw new Error('my error');
      // resolve('resolved');
    }, 1500);
  });
}
var reject = Promise.reject('fail');
var pending = new Promise(() => {});

var run = async () => {
  var values = await Promise.allSettled([resolve, reject, resolve2()])
    .then((data) => {
      console.log('values__', data);
      return data;
    })
    .catch((err) => {
      console.log('🚀 ~ file: promise.js ~ line 30 ~ values ~ err', err);
    });
  console.log('🚀 values', values);

  await Promise.all([resolve, resolve2()]).then((data) => {
    console.log('data', data);
  });
};
{
  class PM {
    constructor(cb) {
      this.state = {
        resolve: () => {},
        reject: () => {},
      };
      cb(this.state.resolve, this.state.reject);
    }
  }
  // we can store resolve, reject of a promise then use that later
  const p = { resolve: null, reject: null };
  const pm = new PM((res, rej) => {
    p.resolve = res;
    p.reject = rej;
  });

  // promise hell
  successFunc().then((val) => {
    //
    failFunc().then((val2) => {
      //
    });
  });
  // use this
  successFunc()
    .then((val) => {
      //
      return failFunc();
    })
    .then((val2) => {
      //
    });
}

{
  const test = () => {
    console.log(1);
    Promise.resolve(2).then(console.log);
    console.log(3);
  };

  const test2 = async () => {
    console.log(1);
    await Promise.resolve(2)
      .then(console.log)
      .finally(() => console.log('Promise finally'));
    console.log(3);
  };
  test();
  test2();
}

(async () => {
  try {
    // await run();
    const await1 = await successFunc();
    console.log('await1', await1);
    successFunc().then((then) => console.log('then', then));
    successFunc((err, data) => console.log('hai:', data));
  } catch (e) {
    console.log('🚀 e', e);
  }
})();
