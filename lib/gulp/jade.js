'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var newer = require('gulp-newer');
var lint = require('gulp-jadelint');

var errcb = require('../helpers').errcb;

module.exports = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer({
      dest: dest,
      ext: '.html'
    }))
    .pipe(lint())
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest(dest));
};
