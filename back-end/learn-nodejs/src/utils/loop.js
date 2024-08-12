const array = Array(1000000)
console.log("array", array)

console.time('loop')
// for (item in array) { } //                       1.410ms - 2.114ms
// array.forEach(() => { }) //                      1.982ms - 2.429ms
// for (let i = 0; i < array.length; i++) { } //    2.009ms - 3.652ms
// array.filter(() => { }) //                       2.533ms - 3.097ms
// array.reduce((res, cur) => res, 0) //            3.747ms - 4.817ms
// array.map(() => { }) //                         10.345ms - 14.732ms
// for (item of array) { } //                      27.377ms - 32.306ms
console.timeEnd('loop') 
const shortArr = [1, 2, 3, 4, 5];
shortArr.forEach(item => {
  if (item > 3) {
    // SyntaxError: Illegal break statement
    break;
  }
});

for (const item of shortArr) {
  if (item > 3) {
    break;
  }
}
for (const item in shortArr) {
  if (item > 3) {
    break;
  }
}
for (let index = 0; index < array.length; index++) {
  const item = array[index];
  if (item > 3) {
    break;
  }
}
