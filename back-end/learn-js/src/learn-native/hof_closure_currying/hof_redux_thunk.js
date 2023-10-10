const connect = (action) => {
  const dispatch = () => console.log('dispatch');
  const getState = () => console.log('getState');
  // still need export action again, then use that exported action to execute func action
  return action.apply(this, arguments)(dispatch, getState);
  // action()(dispatch, getState);
};

const action1 = (abc) => (dispatch, getState) => {
  console.log("🚀 ~ file: hof_redux_thunk.js:8 ~ action1 ~ abc", abc)
  dispatch();
  getState();
};

function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

console.log(sum(1, 2, 3));
// Expected output: 6

console.log(sum(1, 2, 3, 4));
// Expected output: 10

const action1Wrapper = connect(action1);
action1Wrapper('hello hai2134')
