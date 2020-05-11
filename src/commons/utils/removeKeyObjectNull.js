import _ from "lodash";

export const removeKeyObjectNull = object => {
  const newObject = { ...object };
  if (object) {
    Object.keys(newObject).forEach(key => {
      if (
        newObject[key] === "" ||
        newObject[key] === "none" ||
        !newObject[key] ||
        _.isEqual(newObject[key], [0, 0])
      )
        delete newObject[key];
    });
    return newObject;
  }
  return newObject;
};

export default null;
