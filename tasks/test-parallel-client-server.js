const { series } = require('gulp');
const testClient = require('./test-client');
const testServer = require('./test-server');

const task = series(testClient, testServer);

module.exports = task;
