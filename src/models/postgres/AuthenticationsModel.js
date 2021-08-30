const BaseModel = require('./BaseModel');

class AuthenticationsModel extends BaseModel {
  constructor({ database }) {
    super({ database });
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await this._db.query(query);
  }

  async isRefreshTokenExists(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._db.query(query);
    return result.rowCount !== 0;
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1 RETURNING token',
      values: [token],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0].token;
  }
}

module.exports = AuthenticationsModel;
