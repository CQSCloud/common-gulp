const { series } = require('gulp');
const jslintServerSpec = require('./jslint-server-spec');
const jslintSharedSpec = require('./jslint-shared-spec');

const task = series(jslintServerSpec, jslintSharedSpec);
task.displayName = 'test-server-prereq';
module.exports = task;
