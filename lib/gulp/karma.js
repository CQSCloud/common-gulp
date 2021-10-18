'use strict';

var _ = require('lodash');
var path = require('path');
var karma = require('karma');
// const parseConfig = karma.config.parseConfig;
// const Server = karma.Server;

// return parseConfig(
//   path.join(process.cwd(), 'karma.conf.js'),
//   { port: 9876 },
//   { promiseConfig: true, throwErrors: true }
// ).then(
//   (karmaConfig) => {
//     const server = new Server(karmaConfig, function doneCallback(exitCode) {
//       console.log(`Karma has exited with ${exitCode}`);
//       process.exit(exitCode);
//     });
//     return server;
//   },
//   (rejectReason) => {
//     /* respond to the rejection reason error */
//     console.log('respond to the rejection reason error', rejectReason);
//   }
// );

module.exports = function(done, options) {
  // return parseConfig(
  //   null,
  //   _.merge({
  //     configFile: path.join(process.cwd(), 'karma.conf.js'),
  //     singleRun: true
  //   }, options || {}),
  //   { promiseConfig: true, throwErrors: true }
  // ).then(
  //   (karmaConfig) => {
  //     // const server = new Server(karmaConfig, done);
  //     const server = new Server(karmaConfig, function doneCallback(exitCode) {
  //       console.log(`Karma has exited with ${exitCode}`);
  //       done();
  //       process.exit(exitCode);
  //     });
  //     return server.start();
  //   },
  //   (rejectReason) => {
  //     /* respond to the rejection reason error */
  //     console.log('respond to the rejection reason error', rejectReason);
  //   }
  // );

  new karma.Server(
    _.merge({
      configFile: path.join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, options || {}), done).start();
};
