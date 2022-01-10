const { series } = require('gulp');
const jslintClientSpec = require('./jslint-client-spec');

const testClientPrerequisites = series(jslintClientSpec);

module.exports = testClientPrerequisites;
