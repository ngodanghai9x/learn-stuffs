import { interval, Observable, firstValueFrom, filter, map } from "rxjs";

var source = interval(1000),
  subscription1 = source.subscribe(function (x) {
    console.log("Observer 1: onNext: " + x);
  }),
  subscription2: typeof subscription1;

setTimeout(function () {
  subscription2 = source.subscribe(function (x) {
    console.log("Observer 2: onNext: " + x);
  });
}, 3000);

setTimeout(function () {
  subscription1.unsubscribe();
  subscription2.unsubscribe();
}, 10000);

// Observer 1: onNext: 0
// Observer 1: onNext: 1
// Observer 1: onNext: 2
// Observer 1: onNext: 3
// Observer 1: onNext: 4
// Observer 1: onNext: 5
// Observer 1: onNext: 6
// Observer 1: onNext: 7
// Observer 1: onNext: 8
// Observer 2: onNext: 0
// Observer 2: onNext: 1
// Observer 2: onNext: 2
// Observer 2: onNext: 3
// Observer 2: onNext: 4
// Observer 2: onNext: 5
