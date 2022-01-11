'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-clean-css');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');

const { isProduction } = require('../lib/is-env');

const task = (file, src) => {
  return gulp.src(src, { allowEmpty: true })
    .pipe(newer('dist/public/styles/' + file)) // eslint-disable-line  prefer-template
    .pipe(gulpif(isProduction(), cssmin({
      keepBreaks: true
    })))
    .pipe(concat(file))
    .pipe(gulp.dest('dist/public/styles/'));
};

task.displayName = 'cssconcat';

module.exports = task;
