const { series } = require('gulp');
const testServer = require('./test-server');
const testClient = require('./test-client');
const coverage = require('./base/coverage');

const test = series(testServer, testClient, coverage);
test.displayName = 'test';

module.exports = test;
