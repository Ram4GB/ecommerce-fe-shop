/**
 *
 * @param {*} object
 * @param {*} prefix
 * @returns return new object has put prefix in front of key object
 * @example obj =  { a:1,b:2 } => convertObject(obj,abc) => { abc.a:1, abc.b: 2 }
 */

export const convertObject = (object, prefix) => {
  const obj = {};
  Object.keys(object).forEach(key => {
    obj[`${prefix}${key}`] = object[key];
  });
  return obj;
};

export default null;
