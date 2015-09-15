'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var newer = require('gulp-newer');
var annotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var path = require('path');

var isProd = require('../helpers').isProd;

module.exports = function(file, dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest + file))
    .pipe(eslint({}))
    .pipe(eslint.format())
    .pipe(gulpif(!isProd(), sourcemaps.init()))
    .pipe(babel({
      babelrc: path.join(process.cwd(), '.babelrc')
    }))
    .pipe(gulpif(isProd(), annotate()))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulpif(!isProd(), sourcemaps.write('.', {
      sourceRoot: '/scripts/',
      sourceMappingURLPrefix: '/scripts/'
    })))
    .pipe(gulp.dest(dest));
};
