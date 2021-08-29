const Handler = require('./handler');
const createRoutes = require('./routes');

module.exports = {
  name: 'Songs API',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new Handler({ service });
    const routes = createRoutes({ handler, validator });
    server.route(routes);
  },
};
