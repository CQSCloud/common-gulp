'use strict';

var gulp = require('gulp');
var common = require('./lib/gulp');

gulp.task('lint', function() {
  return common.jslint(['./index.js', 'lib/**/*.js']);
});

gulp.task('default', ['lint']);
