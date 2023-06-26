export const keys = (obj) => Object.keys(obj);

export const values = (obj) => keys(obj)
  .map(key => obj[key]);

export const empty = (obj) => keys(obj)[0] === undefined;

export const map = (obj, transform) => keys(obj).map(key => transform(obj[key], key));


export const filter = (obj, predicate) => toArray(obj)
  .filter(entry => {
    const key = keys(entry)[0];
    return predicate(entry[key], key);
  });

export const reduce = (obj, callback, init) => keys(obj)
  .reduce((rs, key) => callback(rs, obj[key], key), init);

export const toArray = (obj) => map(obj, (value, key) => ({ [key]: value }));

export const clean = (obj) => Object.keys(obj)
  .forEach(key => (!obj[key] || obj[key].length === 0 ? delete obj[key] : ''));

export const cleanAndReturn = (obj) => {
  clean(obj);
  return obj;
};