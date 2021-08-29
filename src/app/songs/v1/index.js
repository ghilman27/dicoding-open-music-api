const Handler = require('./handler');
const Validator = require('./validator');
const createRoutes = require('./routes');

module.exports = {
  name: 'Songs API',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new Handler({ service });
    const routes = createRoutes({ handler, validator: Validator });
    server.route(routes);
  },
};
