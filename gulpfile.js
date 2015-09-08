'use strict';

var gulp = require('gulp');
var common = require('./gulp');

gulp.task('lint', function() {
  return common.jslint(['!node_modules/**', '**/*.js']);
});

gulp.task('default', ['lint']);
