'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');
const pug = require('gulp-pug');
const lint = require('gulp-pug-lint');
const errcb = require('../lib/error-callback');
const exitcb = require('../lib/error-and-exit-callback');

const task = (dest, src) => {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer({
      dest: dest,
      ext: '.html'
    }))
    .pipe(lint())
    .pipe(pug().on('error', exitcb))
    .on('error', errcb)
    .pipe(gulp.dest(dest));
};

module.exports = task;
