'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');

module.exports = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer(dest))
    .pipe(gulp.dest(dest));
};
