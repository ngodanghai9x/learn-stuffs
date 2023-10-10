const { parse, stringify, toJSON, fromJSON } = require('flatted');

const a = [{}];
const b = [{}];
a[0].a = a;
a.push(a);

stringify(a); // [["1","0"],{"a":"0"}]
console.log('a= ', a);
console.log('stringify(a)= ', stringify(a));
console.log('JSON.stringify(b)= ', JSON.stringify(b));
console.log('JSON.parse(JSON.stringify(b))= ', JSON.parse(JSON.stringify(b)));
console.log('stringify(b)= ', stringify(b));
console.log('parse(stringify(b))= ', parse(stringify(b)));
