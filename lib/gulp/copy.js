'use strict';

var gulp = require('gulp');
var newer = require('gulp-newer');

module.exports = function(dest, src) {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer(dest))
    .pipe(gulp.dest(dest));
};
