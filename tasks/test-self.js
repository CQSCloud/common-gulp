const { series } = require('gulp');
const testServer = require('./test-server');
const testClient = require('./test-client');
const testCompile = require('./test-compile');

const test = series(testServer, testClient, testCompile);
test.displayName = 'test-self';

module.exports = test;
