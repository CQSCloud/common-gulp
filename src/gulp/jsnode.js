'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const path = require('path');

module.exports = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest))
    .pipe(babel({
      babelrc: path.join(process.cwd(), '.babelrc')
    }))
    .pipe(gulp.dest(dest));
};
