'use strict';

const gulp = require('gulp');

const compileJs = require('./src/gulp/js').compile;
const lintJs = require('./src/gulp/jslint').lint;

const SRC = ['src/**/*.js'];
const DEST = '.';

gulp.task('js', function() {
  return compileJs(DEST, SRC);
});

gulp.task('lint', function() {
  return lintJs(SRC);
});

gulp.task('default', ['lint', 'js']);
