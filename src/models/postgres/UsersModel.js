const BaseModel = require('./BaseModel');

class UsersModel extends BaseModel {
  constructor({ database }) {
    super({ database });
  }

  async add({ username, fullname, password }) {
    const id = `user-${this._generateId()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, password, fullname],
    };

    const result = await this._db.query(query);
    return result.rows[0].id;
  }

  async isUsernameExists(username) {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._db.query(query);
    return result.rowCount !== 0;
  }

  async getIdAndPasswordByUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0];
  }
}

module.exports = UsersModel;
