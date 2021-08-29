const lodashCamelCase = require('lodash.camelcase');
const lodashSnakeCase = require('lodash.snakecase');
const lodashTransform = require('lodash.transform');

const isObject = (obj) => obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';

const StringTransformer = {
  toCamelCase: (string) => lodashCamelCase(string),
  toSnakeCase: (string) => lodashSnakeCase(string),
};

const ObjectTransformer = {
  transform: (object, iterator, accumulator) => lodashTransform(object, iterator, accumulator),
  transformKeys: (object, keyTransformer) => ObjectTransformer.transform(
    object,
    (newObject, currentValue, currentKey, currentObject) => {
      const newKey = Array.isArray(currentObject)
        ? currentKey
        : keyTransformer(currentKey);

      // eslint-disable-next-line no-param-reassign
      newObject[newKey] = isObject(currentValue)
        ? ObjectTransformer.transformKeys(currentValue, keyTransformer)
        : currentValue;
    },
  ),
  toCamelKeys: (object) => ObjectTransformer.transformKeys(object, StringTransformer.toCamelCase),
  toSnakeKeys: (object) => ObjectTransformer.transformKeys(object, StringTransformer.toSnakeCase),
};

module.exports = { string: StringTransformer, object: ObjectTransformer };
