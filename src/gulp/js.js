'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const newer = require('gulp-newer');

const compile = function(dest, src) {
  return gulp.src(src)
    .pipe(newer('' + dest))
    .pipe(babel())
    .pipe(gulp.dest(dest));
};

module.exports = {
  compile: compile
};
