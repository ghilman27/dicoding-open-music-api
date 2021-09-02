const bcrypt = require('bcrypt');
const Exceptions = require('../exceptions/authentications');

class AuthenticationsService {
  constructor({ usersModel, authenticationsModel, tokenManager }) {
    this._userModel = usersModel;
    this._authModel = authenticationsModel;
    this._tokenManager = tokenManager;
  }

  async login(username, password) {
    const userId = await this._verifyCredential(username, password);
    return this._createTokens({ id: userId });
  }

  async refreshToken(refreshToken) {
    const tokenPayload = await this._verifyRefreshToken(refreshToken);
    return this._tokenManager.generateAccessToken(tokenPayload);
  }

  async logout(refreshToken) {
    await this._verifyRefreshToken(refreshToken);
    await this._authModel.deleteRefreshToken(refreshToken);
  }

  async _createTokens(payload) {
    const accessToken = await this._tokenManager.generateAccessToken(payload);
    const refreshToken = await this._tokenManager.generateRefreshToken(payload);
    await this._authModel.addRefreshToken(refreshToken);
    return { accessToken, refreshToken };
  }

  async _verifyCredential(username, password) {
    const user = await this._userModel.getIdAndPasswordByUsername(username);

    if (!user) {
      throw new Exceptions.WrongUsername();
    }

    const { id, password: hash } = user;
    const isPasswordMatch = await bcrypt.compare(password, hash);

    if (!isPasswordMatch) {
      throw new Exceptions.WrongPassword();
    }

    return id;
  }

  async _verifyRefreshToken(refreshToken) {
    const isExists = await this._authModel.isRefreshTokenExists(refreshToken);
    const tokenPayload = await this._tokenManager.verifyRefreshToken(refreshToken);

    if (!isExists) {
      throw new Exceptions.TokenNotFound();
    }

    if (!tokenPayload) {
      throw new Exceptions.InvalidTokenSignature();
    }

    return tokenPayload;
  }
}

module.exports = AuthenticationsService;
