'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

const jsLint = (src, opt) => gulp
  .src(src, { allowEmpty: true })
  .pipe(eslint(opt || {}))
  .pipe(eslint.format());

module.exports = jsLint;
