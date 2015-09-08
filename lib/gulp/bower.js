'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');

module.exports = function(dest) {
  var to = dest || 'bower';
  return bower({ directory: to })
    .pipe(gulp.dest(to));
};
