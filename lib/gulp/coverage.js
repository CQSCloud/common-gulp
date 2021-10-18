'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var lcovmerger = require('lcov-result-merger');

module.exports = function() {
  var root = process.cwd();

  return gulp
    .src(['coverage/*.lcov'], { allowEmpty: true })
    .pipe(replace('SF:' + root, 'SF:')) // eslint-disable-line  prefer-template
    .pipe(replace(/SF:[\.]{0,1}\/src\//g, 'SF:src/'))
    .pipe(lcovmerger())
    .pipe(gulp.dest('coverage/'));
};
