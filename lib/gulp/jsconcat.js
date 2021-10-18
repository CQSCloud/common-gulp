'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var newer = require('gulp-newer');
var uglify = require('gulp-uglify');

var isProd = require('../helpers').isProd;

module.exports = function(file, src) {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer('dist/public/scripts/' + file)) // eslint-disable-line prefer-template
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest('dist/public/scripts/'));
};
