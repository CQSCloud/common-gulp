'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');

const { isProduction } = require('../lib/is-env');

const task = (file, src) => {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer('dist/public/scripts/' + file)) // eslint-disable-line prefer-template
    .pipe(gulpif(isProduction(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest('dist/public/scripts/'));
};

task.displayName = 'jsconcat';

module.exports = task;
