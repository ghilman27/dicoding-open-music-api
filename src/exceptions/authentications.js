/* eslint-disable max-classes-per-file */
class WrongUsername extends Error {
  constructor(message = 'Username is not registered') {
    super(message);
    this.name = 'WrongUsername';
  }
}

class WrongPassword extends Error {
  constructor(message = "Password doesn't match") {
    super(message);
    this.name = 'WrongPassword';
  }
}

class TokenNotFound extends Error {
  constructor(message = 'Token Not Found') {
    super(message);
    this.name = 'TokenNotFound';
  }
}

class InvalidTokenSignature extends Error {
  constructor(message = 'Invalid Token Signature') {
    super(message);
    this.name = 'InvalidTokenSignature';
  }
}

module.exports = {
  WrongUsername,
  WrongPassword,
  TokenNotFound,
  InvalidTokenSignature,
};
