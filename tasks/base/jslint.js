'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

const task = (src, opt) => gulp
  .src(src, { allowEmpty: true })
  .pipe(eslint(opt || {}))
  .pipe(eslint.format());

task.displayName = 'jslint';

module.exports = task;
