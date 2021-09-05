const Handler = require('./handler');
const Validator = require('./validator');
const createRoutes = require('./routes');

module.exports = {
  name: 'Exports API',
  version: '1.0.0',
  register: async (server, { service, auth }) => {
    const handler = new Handler({ service });
    const routes = createRoutes({ handler, auth, validator: Validator });
    server.route(routes);
  },
};
