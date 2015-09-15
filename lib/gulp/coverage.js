'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var lcovmerger = require('lcov-result-merger');

module.exports = function() {
  var root = process.cwd();

  return gulp
    .src(['coverage/*.lcov'])
    .pipe(replace('SF:./src/', 'SF:src/'))
    .pipe(replace('SF:/src/', 'SF:src/'))
    .pipe(replace('SF:' + root, 'SF:'))
    .pipe(lcovmerger())
    .pipe(gulp.dest('coverage/'));
};
