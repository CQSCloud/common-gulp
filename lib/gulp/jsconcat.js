'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var newer = require('gulp-newer');
var uglify = require('gulp-uglify');

var isProd = require('../helpers').isProd;

module.exports = function(file, src) {
  return gulp
    .src(src)
    .pipe(newer('dist/public/scripts/' + file))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest('dist/public/scripts/'));
};
