const { series } = require('gulp');
const mocha = require('./base/mocha');
const testServerPrereq = require('./test-server-prereq');

const startMocha = (cb) => mocha(
  cb, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'],
  ['spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js']
);
startMocha.displayName = 'Running Mocha on Server Code ./spec/**';

const task = series(testServerPrereq, startMocha);

module.exports = task;
