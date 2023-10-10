const util = require('util');
const a = util.format('%s:%s', 'foo', 'bar', 'baz');
const b = util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 });
console.log("🚀 ~ file: ulti.js ~ line 2 ~ a", {
  a,
  b
})