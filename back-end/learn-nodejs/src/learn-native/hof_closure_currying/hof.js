async function wrapperFunc(callback, ...args) {
    try {
        console.log("Wrapper func");
        // Kiểm tra xem callback có phải là async function không
        console.log("🚀 ~ wrapperFunc ~ callback.constructor.name:", callback.constructor)
        if (callback.constructor.name === 'AsyncFunction') {
            return await callback(...args);
        } else {
            return callback(...args);
        }
    } catch (e) {
        console.log(`Wrapper func with error: ${e}`);
        return null;
    }
}


const add = (a, b) => console.log(a + b);

const addAsync = async (a, b) => {
    return Promise.resolve(a + b);
}

wrapperFunc(add, 3, 4);
wrapperFunc(addAsync, 1, 2);