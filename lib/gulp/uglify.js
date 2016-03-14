'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var isProd = require('../helpers').isProd;

module.exports = function(file, dest, src) {
  return gulp
    .src(src)
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest(dest));
};
