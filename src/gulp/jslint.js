'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

module.exports = function(src, opt = {}) {
  return gulp
    .src(src)
    .pipe(eslint(opt))
    .pipe(eslint.format());
};
