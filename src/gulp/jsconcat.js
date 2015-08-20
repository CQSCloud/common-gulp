'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');

const isProd = require('../helpers').isProd;

module.exports = function(file, dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest + file))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest(dest));
};
