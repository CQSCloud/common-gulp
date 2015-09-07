'use strict';

const path = require('path');
const karma = require('karma');

module.exports = function(done) {
  const server = new karma.Server({
    configFile: path.join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }, function(exitCode) {
    console.log(`Karma has exited with ${exitCode}`)
    done();
  });

  server.start();
};
