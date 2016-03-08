'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var newer = require('gulp-newer');
var path = require('path');

var errcb = require('../helpers').errcb;

module.exports = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest)) // eslint-disable-line prefer-template
    .pipe(eslint({}))
    .pipe(eslint.format())
    .pipe(babel({
      babelrc: path.join(process.cwd(), '.babelrc')
    }))
    .on('error', errcb)
    .pipe(gulp.dest(dest));
};
