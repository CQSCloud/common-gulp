'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

const run = function(src, opt = {}) {
  return gulp
    .src(src)
    .pipe(eslint(opt))
    .pipe(eslint.format());
};

gulp.task('jslint-client', function() {
  return run(['src/client/scripts/**/*.js']);
});

gulp.task('jslint-client-spec', function() {
  return run(['spec/client/**/*.js']);
});

gulp.task('jslint-server', function() {
  return run(['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('jslint-server-spec', function() {
  return run(['spec/server/**/*.js', 'spec/shared/**/*.js']);
});

module.exports = run;
