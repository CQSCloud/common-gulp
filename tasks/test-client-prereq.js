const { series } = require('gulp');
const jslintClientSpec = require('./jslint-client-spec');

const testClientPrerequisites = series(jslintClientSpec);
testClientPrerequisites.displayName = 'test-client-prereq';
module.exports = testClientPrerequisites;
