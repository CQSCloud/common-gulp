'use strict';

const gulp = require('gulp');
const bower = require('gulp-bower');

module.exports = function(dest) {
  return bower({ directory: 'bower' })
    .pipe(gulp.dest(dest));
};
