/*eslint-disable */
export const empty = arr => arr[0] === undefined;
export const contain = (arr, value) => arr.indexOf(value) >= 0;

export const toMap = (arr, value) => {
  return arr.reduce((rs, item) => {
    rs[item] = value;
    return rs;
  }, {});
};

export const toggle = (arr, value) => {
  if (contain(arr, value)) {
    return arr.filter(i => i !== value);
  }
  return arr.concat(value);
};

export const notCoExist = (arr, newItem, pair) => {
  const index = pair.indexOf(newItem);
  if (index < 0) {
    return toggle(arr, newItem);
  } else if (contain(arr, newItem)) {
    return arr.filter(item => item !== newItem);
  } else {
    return arr.filter(item => item !== pair[1 - index])
      .concat(newItem);
  }
};

export const notCoExistV2 = (arr, newItem, isVertical) => {
  if (isVertical) {
    if (contain(arr, newItem)) {
      return arr;
    } else {
      const itemCheck = checkExistNotItem(arr, newItem)
      if (itemCheck)
        return arr.filter(item => item !== itemCheck).concat(newItem);
    }
  } else {
    const itemFilter = checkExistNotItem(arr, newItem)
    arr = arr.filter(item => item !== itemFilter)
    if (contain(arr, newItem)) {
      return arr.filter(i => i !== newItem);
    }
    return arr.concat(newItem);
  }
};

export const checkExistNotItem = (arr, item) => {
  const arr1 = ['has_reply', 'has_unreply'];
  const arr2 = ['has_uncheckdone', 'has_checkdone'];
  const arr3 = ['has_order', 'has_unOrder'];
  const arr4 = ['has_phone', 'has_unPhone'];
  const arr5 = ['has_unread', 'has_read'];

  if (contain(arr1, item))
    return arr1[1 - arr1.indexOf(item)];
  else if (contain(arr2, item))
    return arr2[1 - arr2.indexOf(item)];
  else if (contain(arr3, item))
    return arr3[1 - arr3.indexOf(item)];
  else if (contain(arr4, item))
    return arr4[1 - arr4.indexOf(item)];
  else if (contain(arr5, item))
    return arr5[1 - arr5.indexOf(item)];
};

export const cleanFilterFields = (arr, type) => {
  const itemCheck = checkCleanFields(type)
  if (itemCheck)
    return arr.filter(item => item !== itemCheck[0] && item !== itemCheck[1]);
};

export const checkCleanFields = (item) => {
  const arr1 = ['has_reply', 'has_unreply'];
  const arr2 = ['has_uncheckdone', 'has_checkdone'];
  const arr3 = ['has_order', 'has_unOrder'];
  const arr4 = ['has_phone', 'has_unPhone'];
  const arr5 = ['has_unread', 'has_read'];

  if (item === 'reply')
    return arr1;
  else if (item === 'checkdone')
    return arr2;
  else if (item === 'order')
    return arr3;
  else if (item === 'phone')
    return arr4;
  else if (item === 'read')
    return arr5;

};


export const chunk = (array, size = 1) => {
  if (size < 1) return array.map(item => [item]);
  if (size >= array.length) return [array];

  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export const convertToArray = (arrObj) => {
  if (!Array.isArray(arrObj) && typeof arrObj === 'object') {
    return Object.values(arrObj);
  }
  return arrObj || [];
}

export const convertTreeToList = (root) => {
  if (!root) return [];
  const array = [];
  root.forEach(node => pushNodeAndChildren(node, array));

  return array;
}

const pushNodeAndChildren = (node = {}, array) => {
  array.push(node);
  array.concat(node.folder_images || []);
  if (node.folder_images && node.folder_images.length) {
    node.folder_images.forEach(item => pushNodeAndChildren(item, array));
  }
}