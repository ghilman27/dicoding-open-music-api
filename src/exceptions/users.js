class UsernameExists extends Error {
  constructor(message = 'Username already exists') {
    super(message);
    this.name = 'UsernameExists';
  }
}

module.exports = { UsernameExists };
