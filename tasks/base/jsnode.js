'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');
const errcb = require('../lib/error-callback');
const {
  isProduction
} = require('../lib/is-env');

const task = (dest, src) => {
  return gulp
    .src(src, {
      allowEmpty: true
    })
    .pipe(newer('' + dest)) // eslint-disable-line prefer-template
    .pipe(eslint({}))
    .pipe(eslint.format())
    .pipe(gulpif(!isProduction(), sourcemaps.init()))
    .pipe(babel({
      babelrc: true
    }))
    .on('error', (error) => {
      console.log('jsNode Error:', error);
      return errcb();
    })
    .pipe(gulpif(!isProduction(), sourcemaps.write('.', {
      includeContent: false,
      destPath: dest
    })))
    .pipe(gulp.dest(dest));
};

task.displayName = 'jsnode';

module.exports = task;
