const karma =  require('./base/start-karma');
const { series } = require('gulp');
const testClientPrerequisites = require('./test-client-prereq');

const testClient = series(testClientPrerequisites, karma);

module.exports = testClient;
