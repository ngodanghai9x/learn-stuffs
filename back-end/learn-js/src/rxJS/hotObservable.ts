import { interval, Observable, firstValueFrom, filter, map, Subject } from "rxjs";

var source = interval(1000);

// Chuyển thành Hot Observable
var hot = source.publish();

// Tại thời điểm này thì giá trị chưa được push vào
var subscription1 = hot.subscribe(function (x) {
  console.log("Observer 1: onNext: %s", x);
});

console.log("Current Time after 1st subscription: " + Date.now());

// Sau đấy 3 giây ……
setTimeout(function () {
  // sử dụng hàm `connect()` kết nối vào `source`
  // Ở đây thì push những giá trị lấy ra từ source sẽ được push vào hot observer
  hot.connect();

  console.log("Current Time after connect: " + Date.now());

  // sau đấy 3 giây tiếp theo
  setTimeout(function () {
    console.log("Current Time after 2nd subscription: " + Date.now());
    var subscription2 = hot.subscribe(function (x) {
      console.log("Observer 2: onNext: %s", x);
    });
  }, 3000);
}, 3000);
