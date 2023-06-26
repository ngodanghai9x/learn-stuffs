function parseJwt2(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  console.log("🚀 ~ base64", base64)
  var temp = atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')
  console.log("🚀 ~ temp", temp)

  var jsonPayload = decodeURIComponent(temp);

  return JSON.parse(jsonPayload);
};
function parseJwt1(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
console.log(parseJwt2(`00D5h000003lVmS!AREAQMxxpv0kQqBYG9SVK56VTUYU92KPc7kpmxPjh.d07NyNbZlzFi5cJfU432tKowAyVPhzM7m8VLT2.ZtrJY4KZw.OGuqz`))