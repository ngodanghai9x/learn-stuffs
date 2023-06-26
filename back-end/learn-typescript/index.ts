let x: string = '';

// Unions 
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
function getLength(obj: string | string[]) {
  return obj.length;
}
let abc: string | string[] = '';

// Generics
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

// Structural Type System
interface Backpack<T> {
  add: (obj: T) => void;
  add2: (obj: T) => string;
  get: () => T;
  name: T,
  age: number,
}

declare const backpack: Backpack<string>;
const object = backpack.get();
console.log("🚀 ~ file: index.ts ~ line 26 ~ object", object)
backpack.add('23');
backpack.name = '';
backpack.age = 12;

interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

class VirtualPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
type Person = { name: string; age: number }
type Name = Pick<Person , 'name'>;

const n: Name = {name: 'John'}; // ok
const err: Name = {name: 'John', age: 26} // error

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Person1 = { name: string; age: number }

type Name1 = Omit<Person , 'age'>;

const n1: Name1 = {name: 'John'}; // ok
const err1: Name1 = {name: 'John', age: 26} // error