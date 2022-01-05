'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');

const task = (dest, src) => {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer(dest))
    .pipe(gulp.dest(dest));
};

module.exports = task;
