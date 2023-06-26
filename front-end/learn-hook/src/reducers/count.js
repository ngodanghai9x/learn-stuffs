
const initState = {
  count: 0,
  temp: '',
  key: 1,
};
const countReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'SUB':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'CHANGE_KEY':
      return {
        ...state,
        key: action.key,
      };
    default:
      return state;
  };
};

export default countReducer;