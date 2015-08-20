'use strict';

const gulp = require('gulp');
const serial = require('run-sequence');

const common = require('./src');

const SRC = ['src/**/*.js'];
const DEST = '.';

gulp.task('lint', function() {
  return common.jslint(SRC);
});

gulp.task('js', ['lint'], function() {
  return common.jsnode(DEST, SRC);
});

gulp.task('test', function(cb) {
  return serial('test-server', 'test-client', 'coverage', cb);
});

gulp.task('default', ['lint', 'js']);
