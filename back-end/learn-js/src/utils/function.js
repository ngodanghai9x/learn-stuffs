function test() {
  console.log(this)
}

class Test {
  state = {}
  constructor() { }
  log() {
    console.log(this)
  }
}

test();
var a = new Test()
a.log()