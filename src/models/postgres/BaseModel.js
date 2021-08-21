const { nanoid } = require('nanoid');
const Transformer = require('../../utils/transformer');
const NotFoundError = require('../../exceptions/NotFoundError');

class BaseModel {
    constructor({ database }) {
        this._db = database;
    }

    _generateId = () => nanoid(16);

    _mapQueryResultToModel = (result) => {
        return Transformer.object.toCamelKeys(result);
    };

    _isResultFound = (result) => {
        if (!result.rowCount) {
            throw new NotFoundError('Result Not Found');
        }
    }
}

module.exports = BaseModel;
