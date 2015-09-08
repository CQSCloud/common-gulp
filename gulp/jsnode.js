'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var newer = require('gulp-newer');
var path = require('path');

module.exports = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest))
    .pipe(babel({
      babelrc: path.join(process.cwd(), '.babelrc')
    }))
    .pipe(gulp.dest(dest));
};
