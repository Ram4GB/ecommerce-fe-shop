import _ from "lodash";

export const removeKeyObjectNull = (senderData, attributes) => {
  const newObject = { ...senderData };
  if (senderData) {
    Object.keys(newObject).forEach(key => {
      if (newObject[key] === "" || newObject[key] === "none" || !newObject[key])
        delete newObject[key];

      const foundAttr = attributes.find(attr => `attributes.${attr.id}` === key);
      if (
        !!foundAttr &&
        foundAttr.valueType === "dynamic" &&
        _.isEqual(newObject[key], foundAttr.valueRanges)
      )
        delete newObject[key];
    });
    return newObject;
  }
  return newObject;
};

export default null;
