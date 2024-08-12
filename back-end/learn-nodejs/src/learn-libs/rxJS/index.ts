import { from, Observable, firstValueFrom, filter, map } from "rxjs";

// https://viblo.asia/p/rxjs-va-reactive-programming-63vKj6oxK2R#_25-flatten-array-6
// https://www.tiepphan.com/rxjs-reactive-programming/#rxjs-Operators

/**
* Observable: 
    đại diện cho khái niệm về một tập hợp các giá trị hoặc các sự kiện trong tương lai. 
    Khi các giá trị hoặc sự kiện phát sinh trong tương lai, Observable sẽ điều phối nó đến Observer.
* Observer: 
    là một tập hợp các callbacks tương ứng cho việc lắng nghe các giá trị (next, error, hay complete) được gửi đến bởi Observable.
* Subscription: 
    là kết quả có được sau khi thực hiện một Observable, nó thường dùng cho việc hủy việc tiếp tục xử lý.
* Operators: 
    là các pure functions cho phép lập trình functional với Observable.
* Subject: 
    để thực hiện việc gửi dữ liệu đến nhiều Observers (multicasting).
* Schedulers: 
    một scheduler sẽ điều khiển khi nào một subscription bắt đầu thực thi, và khi nào sẽ gửi tín hiệu đi
 */
// const observer = {
//   next: val => console.log(val),
//   error: err => console.log(err),
//   complete: () => console.log('done')
// }
const observer = Observable.create(
  function (num: string) {
    // Khi có 1 giá trị mới được push vào next
    return console.log("onNext: " + num);
  },
  function (error: string) {
    return console.log("onError: " + error);
  },
  function () {
    // Stream sẽ kết thúc khi tất cả các giá trị được push vào
    return console.log("onCompleted");
  }
);

const arr = [1, 2, 3, 4, 5];

from(arr)
  .pipe(
    filter((num) => num % 2 === 0),
    map((num) => `subscribe observer instance-${num}`)
  )
  .subscribe(observer);

from(arr)
  .pipe(
    filter((num) => num % 2 === 0),
    map((num) => `forEach log-${num}`)
  )
  .forEach(console.log);

from(arr)
  .pipe(
    filter((num) => num % 2 === 0),
    map((num) => `subscribe next() error() complete()-${num}`)
  )
  .subscribe(
    (val) => console.log("next()", val),
    (err) => console.log("error()", err),
    () => {
      console.log("complete() done---");
    }
  );
