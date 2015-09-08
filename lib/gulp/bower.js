'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');

module.exports = function(dest) {
  return bower({ directory: dest || 'bower' })
    .pipe(gulp.dest(dest));
};
