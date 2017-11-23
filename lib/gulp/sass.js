'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var gulpif = require('gulp-if');
var ignore = require('gulp-ignore');
var sass = require('gulp-sass');

var helpers = require('../helpers');

var errcb = helpers.errcb;
var isProd = helpers.isProd;

module.exports = function(src, includePaths, _options) {
  var options = _options || {};
  var destDir = options.destDir || 'dist/public/styles';
  var destFile = options.destFile || 'client.css';
  var ignorePaths = options.ignore || ['**/src/client/styles/application.sass'];

  var task = gulp.src(src).pipe(ignore.include(true, ignorePaths));

  return task
    .pipe(sass({
      sourceComments: 'normal',
      outputStyle: 'nested',
      includePaths: includePaths || []
    }))
    .on('error', errcb)
    .pipe(ignore.exclude('*.css.map'))
    .pipe(gulpif(isProd(), cssmin({
      keepBreaks: true,
      keepSpecialComments: 0
    })))
    .pipe(concat(destFile))
    .pipe(gulp.dest(destDir));
};
