// var x = '';
// function getLength(obj) {
//     return obj.length;
// }
// var abc = '';
// var object = backpack.get();
// console.log("🚀 ~ file: index.ts ~ line 26 ~ object", object);
// backpack.add('23');
// backpack.name = '';
// backpack.age = 12;
// function logPoint(p) {
//     console.log(p.x + ", " + p.y);
// }
// var VirtualPoint = /** @class */ (function () {
//     function VirtualPoint(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     return VirtualPoint;
// }());
// var newVPoint = new VirtualPoint(13, 56);
// logPoint(newVPoint); // logs "13, 56"
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
;
var colorName = Color[2];
console.log(colorName);
