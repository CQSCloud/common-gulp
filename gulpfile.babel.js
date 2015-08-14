'use strict';

const gulp = require('gulp');
const serial = require('run-sequence');

const coverMerge = require('./src/gulp/coverage').merge;
const compileJs = require('./src/gulp/js').compile;
const lintJs = require('./src/gulp/jslint').lint;
const testMocha = require('./src/gulp/mocha').test;

const SRC = ['src/**/*.js'];
const DEST = '.';

gulp.task('coverage', function() {
  return coverMerge();
});

gulp.task('js', function() {
  return compileJs(DEST, SRC);
});

gulp.task('lint', function() {
  return lintJs(SRC);
});

gulp.task('test-server', function(cb) {
  return testMocha(cb, ['src/**/*.js'], ['spec/server/*.spec.js']);
});

gulp.task('test', function(cb) {
  return serial('test-server', 'coverage', cb);
});

gulp.task('default', ['lint', 'js']);
