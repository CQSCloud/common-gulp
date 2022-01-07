'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');
const pugWrapper = require('gulp-pug');
const lint = require('gulp-pug-lint');
const errorCallback = require('../lib/error-callback');
const errorAndExitCallback = require('../lib/error-and-exit-callback');

const pug = (dest, src) => gulp
  .src(src, { allowEmpty: true })
  .pipe(newer({
    dest: dest,
    ext: '.html'
  }))
  .pipe(lint())
  .pipe(pugWrapper().on('error', errorAndExitCallback))
  .on('error', errorCallback)
  .pipe(gulp.dest(dest));

module.exports = pug;
