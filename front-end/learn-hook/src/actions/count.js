export const add = () => {
  return {
    type: 'ADD',
  };
};

export const sub = () => {
  return {
    type: 'SUB',
  };
};

export const changeKey = (key) => {
  return {
    type: 'CHANGE_KEY',
    key,
  };
};