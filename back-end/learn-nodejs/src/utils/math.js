const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;
const overMax = MAX + 2;

console.log({
  MIN,
  MAX,
  overMax,
  overMax1: MAX + 2,
  overMaxCheck: Number.isSafeInteger(MAX + 2),
})


Math.cbrt(8);    // returns 2
Math.cbrt(64);    // returns 4
Math.cbrt(125);    // returns 5