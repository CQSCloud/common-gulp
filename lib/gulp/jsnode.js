'use strict';

var path = require('path');

var gulp = require('gulp');

var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var newer = require('gulp-newer');
var sourcemaps = require('gulp-sourcemaps');

var errcb = require('../helpers').errcb;
var isProd = require('../helpers').isProd;

module.exports = function(dest, src) {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer('' + dest)) // eslint-disable-line prefer-template
    .pipe(eslint({}))
    .pipe(eslint.format())
    .pipe(gulpif(!isProd(), sourcemaps.init()))
    .pipe(babel({
      babelrc: path.join(process.cwd(), '.babelrc')
    }))
    .on('error', errcb)
    .pipe(gulpif(!isProd(), sourcemaps.write('.', {
      includeContent: false,
      destPath: dest
    })))
    .pipe(gulp.dest(dest));
};
