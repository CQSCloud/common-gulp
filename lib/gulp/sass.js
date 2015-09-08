'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gulpif = require('gulp-if');
var ignore = require('gulp-ignore');
var newer = require('gulp-newer');
var sass = require('gulp-sass');

var helpers = require('../helpers');

var errcb = helpers.errcb;
var isProd = helpers.isProd;

module.exports = function(src, includePaths) {
  return gulp.src(src)
    .pipe(newer('dist/public/styles/client.css'))
    .pipe(ignore.include('**/src/client/styles/application.sass'))
    .pipe(sass({
      indentedSyntax: true,
      sourceComments: 'normal',
      outputStyle: 'nested',
      includePaths: includePaths || []
    }))
    .on('error', errcb)
    .pipe(ignore.exclude('*.css.map'))
    .pipe(gulpif(isProd(), cssmin({
      keepBreaks: true
    })))
    .pipe(concat('client.css'))
    .pipe(gulp.dest('dist/public/styles/'));
};
