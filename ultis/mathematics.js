// giai thừa
function factorial(n) {
  let s = 1;
  for (let i = 1; i <= n; i++)
    s *= i;
  return s;
}

// tổ hợp chập k của n
function combination(k, n) {
  if (k == 0 || k == n) return 1;
  if (k == 1) return n;
  return combination(k - 1, n - 1) + combination(k, n - 1);
}

function productRange(a, b) {
  var prd = a, i = a;
  while (i++ < b) {
    prd *= i;
  }
  return prd;
}
function combinations(n, k) {
  if (n == k || k == 0) {
    return 1;
  }
  else {
    k = (k < n - k) ? n - k : k;
    return productRange(k + 1, n) / productRange(1, n - k);
  }
}

function getCombination(k, n) {
  var res = combinationMap[`${k}_${n}`];
  if (res) return res;
  // res = combination(k, n);
  res = combinations(k, n);
  combinationMap[`${k}_${n}`] = res;
  return res;
}