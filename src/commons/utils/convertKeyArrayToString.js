const convertKeyArrayToString = object => {
  let newObject;
  Object.keys(object).forEach(k => {
    newObject = {
      ...newObject,
      [k]: Array.isArray(object[k]) ? object[k].join(",") : object[k]
    };
  });
  return newObject;
};

export default convertKeyArrayToString;
