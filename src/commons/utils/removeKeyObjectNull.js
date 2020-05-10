export const removeKeyObjectNull = object => {
  if (object) {
    Object.keys(object).forEach(key => {
      if (object[key] === "" || object[key] === "none" || !object[key]) delete object[key];
      return null;
    });
    return object;
  }
  return object;
};

export default null;
