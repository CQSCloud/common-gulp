const gulp = require('gulp');
const mocha = require('./base/mocha');
const testServerPrereq = require('./test-server-prereq');
const task = () => {
  return gulp.series(testServerPrereq, (cb) => {
    return mocha(cb, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], [
      'spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js'
    ]);
  });
};

module.exports = task;
