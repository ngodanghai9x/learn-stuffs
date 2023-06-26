class MyClass {
  abc = 123;
  myMethod() {
    console.log(`myMethod`, this);
  }
  myMethod2 = function () {
    console.log(`myMethod2`, this);
  };
  myMethod3 = () => {
    console.log(`myMethod3`, this);
  };
}

function myFunction() {
  console.log(`myFunction`, this);
}

const arrowFunction = () => {
  console.log(`arrowFunction`, this);
};

console.log(`global`, this);

let myObj = {
  abc: '456',
  myMethod() {
    console.log(`myMethod`, this);
  },
  myMethod2: function () {
    console.log(`myMethod2`, this);
  },
  myMethod3: () => {
    console.log(`myMethod3`, this);
  },
};
myObj.myMethod(); // ES5 Function Call
myObj.myMethod2(); // ES5 Function Call
myObj.myMethod3(); // ES6 Function Call

myFunction();
arrowFunction();
const obj = new MyClass();
obj.myMethod();
obj.myMethod2();
obj.myMethod3();
