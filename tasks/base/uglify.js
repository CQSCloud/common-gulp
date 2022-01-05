'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const annotate = require('gulp-ng-annotate');

const { isProduction } = require('../lib/is-env');

const task = (file, dest, src) => {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(gulpif(isProduction(), annotate()))
    .pipe(gulpif(isProduction(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest(dest));
};

module.exports = task;
