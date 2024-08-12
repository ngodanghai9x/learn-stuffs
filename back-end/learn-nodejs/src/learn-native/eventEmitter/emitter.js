function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Emitter.prototype.emit = function (type) {
  if (this.events[type]) {
    this.events[type].forEach(function (listener) {
      listener();
    });
  }
};

module.exports = Emitter;

function add(a) {
  return (b) => a + b;
}

function add(a, b) {
  return a + b;
}


// class Emitter {
//   constructor() {
//     this.events = {};
//   }
//   on(type, listener) {
//     this.events[type] = this.events[type] || [];
//     this.events[type].push(listener);
//   }
//   emit(type) {
//     if (this.events[type]) {
//       this.events[type].forEach(function (listener) {
//         listener();
//       });
//     }
//   }
// }

// module.exports = Emitter;

