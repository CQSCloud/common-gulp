'use strict';

const path = require('path');
const { config, Server } = require('karma');

const task = (cb, options = {}) => {
  const configFile = options.configFile || path.join(process.cwd(), 'karma.conf.js');
  const karmaConfig = config.parseConfig(
    configFile,
    { promiseConfig: true, throwErrors: true },
    options || {});
  const server = new Server(karmaConfig, cb);
  server.start();
};

task.displayName = 'karma';

module.exports = task;
