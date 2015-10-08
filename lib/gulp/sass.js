'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gulpif = require('gulp-if');
var ignore = require('gulp-ignore');
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var path = require('path');
var _ = require('lodash');

var helpers = require('../helpers');

var errcb = helpers.errcb;
var isProd = helpers.isProd;

module.exports = function(src, includePaths, _options) {
  var options = _options || {};
  var destDir = options.destDir || 'dist/public/styles';
  var destFile = options.destFile || 'client.css';
  var destPath = path.join(destDir, destFile);
  var ignorePaths = options.ignore || ['**/src/client/styles/application.sass'];

  var task = gulp.src(src).pipe(newer(destPath));

  _.each(ignorePaths, function(ignorePath) {
    task = task.pipe(ignore.include(ignorePath));
  });

  return task
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
    .pipe(concat(destFile))
    .pipe(gulp.dest(destDir));
};
