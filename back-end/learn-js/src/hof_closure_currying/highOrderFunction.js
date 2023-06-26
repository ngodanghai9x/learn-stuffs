function myMap(callback = () => { }, array = []) {
  const newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    newArray.push(callback(element) ?? null);
  }
  return newArray;
}

function builtinMap(callback = () => { }) {
  const newArray = [];
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    newArray.push(callback(element) ?? null);
  }
  return newArray;
}

Array.prototype.builtinMap = builtinMap;

const doubleIt = (e) => e * 2;

const array = [1, 2, 3, 4, 5, 6, 7, 8];
const newArray = myMap(doubleIt, array);
const newArray2 = array.map(doubleIt);
const newArray3 = array.builtinMap(doubleIt);

console.log("🚀 newArray", newArray)
console.log("🚀 newArray2", newArray2)
console.log("🚀 newArray3", newArray3)

// Currying 
/**
 * Currying là một kỹ thuật đánh giá function với multiple arguments, thành một chuỗi hàm với 
 * single argument duy nhất. Nói cách khác, khi một function, thay vì lấy tất cả arguments cùng 
 * một lúc, lấy hàm thứ nhất và trả về hàm mới lấy hàm thứ hai và trả về hàm mới lấy hàm thứ ba, 
 * và tiếp tục cho đến khi tất cả các đối số đã được hoàn thành. 
 */
const add = (a, b) => a + b
const add2 = a => b => a + b

add(1, 2) //should return 3
add2(1)(2) //should return 3

const movies = [
  {
    "id": 1,
    "name": "Matrix"
  },
  {
    "id": 2,
    "name": "Star Wars"
  },
  {
    "id": 3,
    "name": "The wolf of Wall Street"
  }
]
const get = property => object => object[property];
const getId = get('id');

movies.map(getId); //should return [ 1, 2, 3 ]
movies.map(get('id')); //should return [ 1, 2, 3 ]
movies.map(obj => obj.id); //should return [ 1, 2, 3 ]

// Closure là một chức năng có quyền truy cập vào phạm vi cha, ngay cả sau khi scope đã đóng.