'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

const task =  (src, opt) => {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(eslint(opt || {}))
    .pipe(eslint.format());
};

module.exports = task;
