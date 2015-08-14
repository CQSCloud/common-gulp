'use strict';

const gulp = require('gulp');
const serial = require('run-sequence');

const common = require('./src');

const SRC = ['src/**/*.js'];
const DEST = '.';

gulp.task('coverage', function() {
  return common.coverage();
});

gulp.task('js', function() {
  return common.jsnode(DEST, SRC);
});

gulp.task('lint', function() {
  return common.jslint(SRC);
});

gulp.task('test-client', function(cb) {
  return common.karma();
});

gulp.task('test-server', function(cb) {
  return common.mocha(cb, ['src/**/*.js'], ['spec/server/*.spec.js']);
});

gulp.task('test', function(cb) {
  return serial('test-server', 'test-client', 'coverage', cb);
});

gulp.task('default', ['lint', 'js']);
