const bcrypt = require('bcrypt');
const Exceptions = require('../exceptions/users');

class UsersService {
  constructor({ usersModel }) {
    this._model = usersModel;
  }

  async addUser({ username, fullname, password }) {
    const isExists = await this._model.isUsernameExists(username);

    if (isExists) {
      throw new Exceptions.UsernameExists();
    }

    const hash = await bcrypt.hash(password, 10);
    const id = await this._model.add({ username, fullname, password: hash });
    return id;
  }
}

module.exports = UsersService;
