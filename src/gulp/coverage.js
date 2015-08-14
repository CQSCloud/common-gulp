'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');
const path = require('path');
const lcovmerger = require('lcov-result-merger');

const merge = function() {
  const root = path.join(__dirname, '../../');

  return gulp.src(['coverage/*.lcov'])
    .pipe(replace('SF:./src/', 'SF:src/'))
    .pipe(replace('SF:' + root, 'SF:'))
    .pipe(lcovmerger())
    .pipe(gulp.dest('coverage/'));
};

module.exports = {
  merge: merge
};
