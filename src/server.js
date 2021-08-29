require('dotenv').config();

const Glue = require('@hapi/glue');
const Dependency = require('./lib/awilix');
const Config = require('./config/config');
const createManifest = require('./config/manifest');

const startServer = async () => {
  try {
    const dependency = new Dependency({
      dependencies: Config.dependencies,
      options: {
        baseDir: __dirname,
      },
    });
    const manifest = createManifest(dependency);
    const server = await Glue.compose(manifest, { relativeTo: __dirname });
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
