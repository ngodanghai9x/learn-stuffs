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

async function sleepAndFail(millSeconds) {
    await sleep(millSeconds);
    await failFunc();
}

async function case1() {
    try {
        const await1 = await successFunc();
        console.log('await1', await1);
        sleepAndFail(1200)
            .then((then) => {
                console.log('then', then);
            })
            .catch((e) => {
                console.log('🚀 e1', e);
            });
    } catch (e) {
        console.log('🚀 e2', e);
    }
}

async function case2() {
    try {
        const await1 = await successFunc();
        console.log('await1', await1);
        await sleepAndFail(1200).then((then) => {
            console.log('then', then);
        });
        // .catch((e) => {
        //     console.log('🚀 e1', e);
        // });
    } catch (e) {
        console.log('🚀 e2', e);
    }
}

async function case3() {
    try {
        const await1 = await successFunc();
        console.log('await1', await1);
        sleepAndFail(1200).then((then) => {
            console.log('then', then);
        });
        // .catch((e) => {
        //     console.log('🚀 e1', e);
        // });
    } catch (e) {
        console.log('🚀 e2', e);
    }
}

(async () => {
    try {
        await case3();
    } catch (e) {
        console.log('🚀 err3', e);
    }
})();
