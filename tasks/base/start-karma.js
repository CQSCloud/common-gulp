'use strict';

const path = require('path');
const { config, Server } = require('karma');

const task = (cb, options) => {
  const karmaConfig = config.parseConfig(
    path.join(process.cwd(), 'karma.conf.js'),
    { promiseConfig: true, throwErrors: true },
    options || {});
  const server = new Server(karmaConfig, cb);
  server.start();
};

task.displayName = 'karma';

module.exports = task;
