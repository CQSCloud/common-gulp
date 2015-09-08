'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var newer = require('gulp-newer');

var errcb = require('../helpers').errcb;

module.exports = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer({
      dest: dest,
      ext: '.html'
    }))
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest(dest));
};
