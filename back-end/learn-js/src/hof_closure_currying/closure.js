function hocExecutedCount(num = 0) {
  const saveInput = num;
  console.log(saveInput);
  function logicFunc() {
    num += 1;
    console.log(`input: ${saveInput} --> `, num);
  }

  return logicFunc;
}

const myLogicFunc = hocExecutedCount(0);

myLogicFunc(); // Chay lan 1
myLogicFunc(); // Chay lan 2
hocExecutedCount(10)()?.()?.()?.();
myLogicFunc(); // Chay lan 3
