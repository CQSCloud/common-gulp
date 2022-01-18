const karma =  require('./base/start-karma');
const { series } = require('gulp');
const testClientPrerequisites = require('./test-client-prereq');

const testClient = series(testClientPrerequisites, karma);
testClient.displayName = 'jslint-server-spec';
testClient.description = 'Karma Tests for Client';
module.exports = testClient;
