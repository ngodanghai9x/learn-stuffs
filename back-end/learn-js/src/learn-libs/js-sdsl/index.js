const { Vector, LinkList, Stack, Queue, PriorityQueue, Deque } = require('js-sdsl');

function measureTime(callback) {
    const start = process.hrtime.bigint();
    callback();
    const end = process.hrtime.bigint();
    return Number(end - start) / 1e6; // Convert nanoseconds to milliseconds
}

let elements = 100_000;

// elements = 40_000;

function testArray() {
    const array = [];
    for (let i = 0; i < elements; i++) {
        array.push(i);
    }
    for (let i = 0; i < elements; i++) {
        // array.indexOf(i);
    }
    for (let i = elements - 1; i >= 0; i--) {
        array.pop();
    }
}

function testSet() {
    const set = new Set();
    for (let i = 0; i < elements; i++) {
        set.add(i);
    }
    for (let i = 0; i < elements; i++) {
        // set.has(i);
    }
    for (let i = elements - 1; i >= 0; i--) {
        set.delete(i);
    }
}

function testVector() {
    const vector = new Vector();
    for (let i = 0; i < elements; i++) {
        vector.pushBack(i);
    }
    for (let i = 0; i < elements; i++) {
        // vector.getElementByPos(i);
    }
    for (let i = elements - 1; i >= 0; i--) {
        vector.popBack();
    }
}

function testLinkList() {
    const linkList = new LinkList();
    for (let i = 0; i < elements; i++) {
        linkList.pushBack(i);
    }
    for (let i = 0; i < elements; i++) {
        // linkList.find(i);
    }
    for (let i = elements - 1; i >= 0; i--) {
        linkList.popBack();
    }
}

console.log('Array:', measureTime(testArray), 'ms');
console.log('LinkList:', measureTime(testLinkList), 'ms');
console.log('Set:', measureTime(testSet), 'ms');
console.log('Vector:', measureTime(testVector), 'ms');
