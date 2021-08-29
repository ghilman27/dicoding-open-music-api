const { nanoid } = require('nanoid');
const Transformer = require('../../utils/transformer');

class BaseModel {
  constructor({ database }) {
    this._db = database;
  }

  _generateId = () => nanoid(16);

  _mapQueryResultToModel = (result) => Transformer.object.toCamelKeys(result);
}

module.exports = BaseModel;
