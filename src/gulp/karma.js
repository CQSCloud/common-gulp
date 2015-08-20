'use strict';

const gulp = require('gulp');
const karma = require('gulp-karma');

const exitcb = require('../helpers').exitcb;

const run = function() {
  return gulp
    .src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', exitcb);
};

gulp.task('test-client', ['jslint-client-spec'], function() {
  return run();
});

module.exports = run;
