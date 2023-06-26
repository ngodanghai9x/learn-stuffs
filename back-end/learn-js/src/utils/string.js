const oneline =
  'Hello \
Dolly!';
const lowerJP = 'こんにちは'; // Japanese greeting
// const lowerJP = 'コンニチハ'; // Japanese greeting
console.log({
  multiline: oneline,
  lowerJP,
  upperJP: lowerJP.toLocaleUpperCase('japan'), // output: "コンニチハ",
  upperVN: 'hai'.toLocaleUpperCase('vietnam'),
  a1: '12345'.padStart(4, 'x'), // 12345
  a2: '12'.padStart(4, 'x'), // xx12
  a3: ''.padStart(4, 'x'), // xxxx
});
