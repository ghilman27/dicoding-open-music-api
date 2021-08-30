const Jwt = require('@hapi/jwt');

module.exports = {
  name: 'Hapi Jwt Auth Strategy',
  version: '1.0.0',
  register: async (server, { name, config }) => {
    await server.register(Jwt);
    server.auth.strategy(name, 'jwt', config);
  },
};
