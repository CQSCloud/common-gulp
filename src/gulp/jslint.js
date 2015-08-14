'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

var lint = function(src, opt = {}) {
  return gulp.src(src)
    .pipe(eslint(opt))
    .pipe(eslint.format());
};

module.exports = {
  lint: lint
};
