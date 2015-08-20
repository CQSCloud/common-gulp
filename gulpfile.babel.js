'use strict';

const gulp = require('gulp');
const common = require('./src');

gulp.task('lint', function() {
  return common.jslint(['src/**/*.js']);
});

gulp.task('js', ['lint'], function() {
  return common.jsnode('.', ['src/**/*.js']);
});

gulp.task('default', ['lint', 'js']);
