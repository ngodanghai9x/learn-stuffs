/* 
Dùng interface khi :
-Bạn viết library - và cung cấp public Api cho người khác dùng

Dùng type khi :
-Bạn muốn một điều gì đó rõ ràng hơn interface
*/

// Merge type: interface ~ var, type ~ const
interface Shape {
  name: string;
}
interface Shape {
  color: string;
}
const Circle: Shape = {
  name: "circle",
  color: "blue",
};

type Shape1 {
  name: string;
}
type Shape1 {
  color:string;
}
const Circle1:Shape1 = {
  name:'circle',
  color:'blue'
}

// Use Computed Properties
type keys2 = 'color' | 'name';
type Shape2 = {
  [key in keys2]:string;
}
const Circle2:Shape2 = {
  name:'circle',
  color:'res'
}

type keys3 = 'color' | 'name';
interface Shape3 {
  [key in keys3]:string;
}
const Circle3:Shape3 = {
  name:'circle',
  color:'res'
}

// Tuples Type
type Tuple = [number, number];

interface ITuple {
  0: number;
  1: number;
}

[1, 2, 3] as Tuple; 
[1, 2, 3] as ITuple; // Ok

// Type có Unions (cả obj to type) còn interface thì không
type colors = 'blue' | 'green' ;

function setColor(color:colors){

}