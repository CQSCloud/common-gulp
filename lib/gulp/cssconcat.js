'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gulpif = require('gulp-if');
var newer = require('gulp-newer');

module.exports = function(file, src) {
  return gulp.src(src)
    .pipe(newer('dist/public/styles/' + file))
    .pipe(gulpif(isProd(), cssmin({
      keepBreaks: true
    })))
    .pipe(concat(file))
    .pipe(gulp.dest('dist/public/styles/'));
};
