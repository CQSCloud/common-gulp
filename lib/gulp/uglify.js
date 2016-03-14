'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var annotate = require('gulp-ng-annotate');

var isProd = require('../helpers').isProd;

module.exports = function(file, dest, src) {
  return gulp
    .src(src)
    .pipe(gulpif(isProd(), annotate()))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest(dest));
};
