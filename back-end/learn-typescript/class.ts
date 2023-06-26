class Parent {
  public privateProperty;
}

interface ISomething extends Parent {
  doSomething(): void;
}

class FirstChild implements ISomething {
  // Ta sẽ gặp lỗi ở đây: 
  //   Class 'FirstChild' incorrectly implements interface 'ISomething'.
  //   Property 'privateProperty' is missing in type 'FirstChild'

  doSomething() {
    // do something
  }
}

// Vẫn lỗi 
class SecondChild extends ISomething {
  
  privateProperty;        //   Class 'SecondChild' incorrectly implements interface 'ISomething'.
                                  //   Property 'privateProperty' is private in type 'ISomething' but not in type 'SecondChild'
  doSomething() {
    // do something
  }
}

// Ngay cả khai báo thế này cũng không ăn thua :v
class ThirdChild extends ISomething {
  
  private privateProperty;        //   Class 'ThirdChild' incorrectly extends baseclass 'Parent'.
                                  //   Types have seperate declarations of a private property 'privateProperty'
  doSomething() {
    // do something
  }
}

// Ta bắt buộc phải khai báo thế này để sử dụng đc interface
class ForthChild extends Parent implements ISomething {
  public privateProperty;
  doSomething() {
     // làm gì thì làm ...
  }
}

class Foo {
  // Typescript does not complain about `a` because we set it in the constructor
  public a: number;

  // Typescript will complain about `b` because we forgot it.
  public b: number;

  // Typescript will not complain about `c` because we told it not to.
  public c!: number;

  // Typescript will not complain about `d` because it's optional and is
  // allowed to be undefined.
  public d?: number;

  constructor() {
    this.a = 5;
  }

}