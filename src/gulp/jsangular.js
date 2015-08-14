'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const annotate = require('gulp-ng-annotate');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const isProd = require('../helpers').isProd;

module.exports = function(file, dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest + file))
    .pipe(gulpif(!isProd(), sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpif(isProd(), annotate()))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulpif(!isProd(), sourcemaps.write('.', {
      sourceRoot: '/scripts/',
      sourceMappingURLPrefix: '/scripts/'
    })))
    .pipe(gulp.dest(dest));
};
