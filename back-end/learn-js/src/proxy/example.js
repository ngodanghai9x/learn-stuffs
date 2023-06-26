var handler = {
  get (target, key) {
    invariant(key, 'get')
    return target[key]
  },
  set (target, key, value) {
    invariant(key, 'set')
    return true
  },
  deleteProperty (target, key) {
    invariant(key, 'delete')
    return true
  }
}
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

var target = { _prop: 'foo' }
var proxy = new Proxy(target, handler)
var null1 = new Proxy(() => {}, handler)
console.log("🚀 ~ file: example.js:24 ~ null1", null1)
console.log('_prop' in proxy)
// <- true
delete proxy._prop
// <- Error: Invalid attempt to delete private "_prop" property