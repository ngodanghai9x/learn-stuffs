// Nơi lưu trữ người đăng ký và các phương thức
function Observable() {
	this.observers = [];
}

// Đăng ký nhận tin
Observable.prototype.subscribe = function(subscriber) {
	this.observers.push(subscriber);
}

// Huỷ đăng ký nhận tin
Observable.prototype.unsubscribe = function(subscriber) {
	this.observers = this.observers.filter(observer => observer !== subscriber);
}

// Thông báo khi có bài viết mới
Observable.prototype.notify = function(data) {
	this.observers.forEach(observer => {
		observer(data);
	})
}

const usersSubscribe = new Observable();

const userOne = (data) => console.log("Subscriber 1 " + data);
const userTwo = (data) => console.log("Subscriber 2 " + data);
const userThree = (data) => console.log("Subscriber 3 " + data);

usersSubscribe.subscribe(userOne); // Người đăng ký
usersSubscribe.subscribe(userTwo); // Người đăng ký
usersSubscribe.subscribe(userThree); // Người đăng ký
usersSubscribe.unsubscribe(userOne); // Người huỷ đăng ký

usersSubscribe.notify("được thông báo bài viết mới")

const myObj = {};
const hasAssignedValue = (obj) => {
  return typeof obj !== 'undefined';
}
hasAssignedValue(myObj);

const isEqual = (object1, object2) => {
  // func này sẽ chỉ check được object 1 tầng, là nested object thì có thể dùng thêm đệ quy để check
  // nhưng tốt hơn là dùng thư viện cho việc so sánh deep các object
  for (const [key, value] of Object.entries(object1)) {
    if (object2?.[key] !== value) return false;
  }
  return true;
}
