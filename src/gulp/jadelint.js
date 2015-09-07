'use strict';

const gulp = require('gulp');
const lint = require('gulp-jadelint');

module.exports = function(src) {
  return gulp
    .src(src)
    .pipe(lint());
};
