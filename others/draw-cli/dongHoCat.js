/* draw this:
****
***
**
*
**
***
****
*/
// Array(4).fill('0').join('');
// Array(4 + 1).join('0');
function draw(n) {
  for (let i = n; i > 0; i--) {
    if (i === 1) {
      // console.log('a')
      break;
    } else {
      console.log(Array(i + 1).join(`${i}`))
    }
  }
  for (let j = 0; j <= n; j++) {
    console.log(Array(j + 1).join(`${j}`))
  }
}

draw(5)