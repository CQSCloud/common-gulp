'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gulpif = require('gulp-if');
var newer = require('gulp-newer');

var isProd = require('../helpers').isProd;

module.exports = function(file, src) {
  return gulp.src(src)
    .pipe(newer('dist/public/styles/' + file)) // eslint-disable-line  prefer-template
    .pipe(gulpif(isProd(), cssmin({
      keepBreaks: true
    })))
    .pipe(concat(file))
    .pipe(gulp.dest('dist/public/styles/'));
};
