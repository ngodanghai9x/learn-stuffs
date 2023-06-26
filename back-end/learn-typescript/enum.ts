enum Color {Red = 1, Green, Blue};
let colorName: string = Color[2];
console.log(colorName);

enum Answer {
  Yes = 1,
  No,
}
console.log(Answer.Yes); // 1
console.log(Answer.No); // 2

enum Month {
  Jan,
  Feb = 3,
  Mar,
  Apr = 6,
  May,
  Jun,
}
console.log(Month.Jan) // 0
console.log(Month.Feb) // 3
console.log(Month.Mar) // 4
console.log(Month.Apr) // 6
console.log(Month.May) // 7
console.log(Month.Jun) // 8

enum Month {
  Jan,
  Feb = 3,
  Mar,
  Apr = 6,
  May = 'May',
  Jun, // compiler sẽ báo lỗi `Enum member must have initializer`
}