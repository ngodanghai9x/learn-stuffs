"use strict";
exports.__esModule = true;
exports.hasInvalidDate = exports.isValidDate = void 0;
var isValidDate = function (date) {
    if (!date || !date.includes("-"))
        return false;
    var temp = +date.split("-");
    var d = new Date(temp[0], temp[1] - 1, temp[2]);
    return d && d.getMonth() + 1 == temp[1];
};
exports.isValidDate = isValidDate;
var hasInvalidDate = function (array, field) {
    if (!array || !array.length)
        return false;
    if (!!field) {
        return array.some(function (item) { return !item || !item[field] || !exports.isValidDate(item[field]); });
    }
    return array.some(function (item) { return !item || !exports.isValidDate(item); });
};
exports.hasInvalidDate = hasInvalidDate;
console.log('is: ', exports.hasInvalidDate(['2011-11-11', '2011-13-1']));
