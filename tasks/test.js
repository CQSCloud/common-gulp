const gulp = require('gulp');
const testServer = require('./test-server');
const testClient = require('./test-client');
const coverage = require('./base/coverage');

const task = () => {
  return gulp.series(testServer, testClient, coverage);
};

module.exports = task;
