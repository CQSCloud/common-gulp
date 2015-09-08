'use strict';

var reporter = require('./reporter');

var stats = {};

module.exports = function(runner) {
  runner.on('start', reporter.start(stats));
  runner.on('pending', reporter.pend(stats));
  runner.on('pass', reporter.pass(stats));
  runner.on('fail', reporter.fail(stats));
  runner.on('end', reporter.stop(stats));
  runner.on('suite', reporter.suite.start(stats));
  runner.on('suite end', reporter.suite.end(stats));
};
