var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
}
var target = { _prop: 'foo', abc: 123 }
var proxy = new Proxy(target, handler)

console.log('_prop' in proxy)
// <- false

for (let key in proxy) {
  console.log(key)
  // <- '_prop' 'abc'
}

