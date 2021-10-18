'use strict';

var gulp = require('gulp');
var newer = require('gulp-newer');
var pug = require('gulp-pug');
var lint = require('gulp-pug-lint');

var errcb = require('../helpers').errcb;
var exitcb = require('../helpers').exitcb;

module.exports = function(dest, src) {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer({
      dest: dest,
      ext: '.html'
    }))
    .pipe(lint())
    .pipe(pug().on('error', exitcb))
    .on('error', errcb)
    .pipe(gulp.dest(dest));
};
