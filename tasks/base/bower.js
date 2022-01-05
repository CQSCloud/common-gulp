'use strict';

const gulp = require('gulp');
const bower = require('gulp-bower');

const task = (dest) => {
  const to = dest || 'bower';
  return bower({ directory: to })
    .pipe(gulp.dest(to));
};

module.exports = task;
