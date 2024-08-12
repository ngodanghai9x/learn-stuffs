(function () {
  const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const randomDec = function (min, max, decimals) {
    return (Math.random() * (max - min) + min).toFixed(decimals || 2);
  };
  const randomList = function (list) {
    return list[randomInt(0, list.length)];
  };
})();
