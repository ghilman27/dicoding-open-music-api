/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const Path = require('path');
const awilix = require('awilix');

class AwilixDependencyContainer {
  constructor({ dependencies, options = {} }) {
    const { baseDir } = options;
    this._baseDir = baseDir || '';
    this._dependencies = dependencies;
    this._container = awilix.createContainer();
    this._dependencies.forEach(this._registerDependency);
  }

  _registerMethods = {
    class: awilix.asClass,
    function: awilix.asFunction,
    value: awilix.asValue,
  };

  _registerDependency = ({ type, name, path }) => {
    const register = this._registerMethods[type];

    if (!register) {
      throw new Error(
        `${type} is not the right dependency type. Please choose one of 'class', 'value', or 'function'.`,
      );
    }

    // global require is safe, because this will be called only on initialization (server.js)
    const dependency = require(Path.resolve(this._baseDir, path));

    this._container.register({
      [name]: register(dependency),
    });
  };

  resolve = (dependency) => this._container.resolve(dependency);
}

module.exports = AwilixDependencyContainer;
