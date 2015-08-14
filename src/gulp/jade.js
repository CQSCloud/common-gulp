'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');
const newer = require('gulp-newer');

const errcb = require('../helpers').errcb;

module.exports = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer({
      dest: dest,
      ext: '.html'
    }))
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest(dest));
};
