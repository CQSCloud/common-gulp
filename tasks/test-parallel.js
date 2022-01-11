const { series } = require('gulp');
const testParelellClientServer = require('./test-parallel-client-server');
const coverage = require('./base/coverage');

const task = () => {
  return series(testParelellClientServer, coverage);
};

module.exports = task;
