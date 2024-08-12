const map = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);

map.set({ a: 1 }, 1);
console.log(map.get({ a: 1 }))

const key = { a: 2 }
map.set(key, 1);
console.log(map.get(key))

map.forEach(function (value, key) {
  console.log(key + ' = ' + value)
})

for (x of map) {
  console.log(JSON.stringify({
    x, x0: x[0], x1: x[1]
  }))
}