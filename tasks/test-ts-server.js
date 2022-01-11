const { series } = require('gulp');
const mocha = require('./base/mocha');
const testServerPrereq = require('./test-server-prereq');
const copyTestFiles = require('./copy-test-files');

const runMocha = (done) => {
  mocha(done,
    ['test/src/server/scripts/**/*.js', 'test/src/shared/scripts/**/*.js'],
    ['spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js']);
};

runMocha.displayName = 'mocha';

const task = () => {
  return series(testServerPrereq, copyTestFiles, runMocha);
};

task.displayName = 'test-ts-server';

module.exports = task;
