print = console.log;
function examPackage() {
  // var n = +gets();
  var n = 10;
  var weightAmountMap = {};
  var arr = [
    '9 7',
    '6 10',
    '6 8',
    '6 9',
    '1 2',
    '15 6',
    '19 9',
    '12 1',
    '11 7',
    '16 8',
  ]
  for (var i = 0; i < n; i++) {
    var [weight, amount] = arr[i].split(" ").map((num) => +num);
    weightAmountMap[weight] = (weightAmountMap[weight] || 0) + amount;
  }
  // var m = +gets();
  var m = 11;
  var sortedWeights = Object.keys(weightAmountMap).map((weight) => +weight).sort((a, b) => a - b);
  console.log("🚀 ~ file: test.js:25 ~ examPackage ~ sortedWeights", sortedWeights)
  for (const weight of sortedWeights) {
    m = m - +weightAmountMap[weight];
    if (m <= 0) {
      print(weight);
      break;
    }
  }
}
examPackage();