'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');
const lcovmerger = require('lcov-result-merger');

const task = () => {
  const root = process.cwd();
  return gulp
    .src(['coverage/*.lcov'], { allowEmpty: true })
    .pipe(replace('SF:' + root, 'SF:')) // eslint-disable-line  prefer-template
    .pipe(replace(/SF:[\.]{0,1}\/src\//g, 'SF:src/'))
    .pipe(lcovmerger())
    .pipe(gulp.dest('coverage/'));
};

module.exports = task;
