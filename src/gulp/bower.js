'use strict';

const gulp = require('gulp');
const bower = require('gulp-bower');

module.exports = function(dest = 'bower') {
  return bower({ directory: dest })
    .pipe(gulp.dest(dest));
};
