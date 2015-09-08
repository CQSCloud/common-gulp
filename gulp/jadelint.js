'use strict';

var gulp = require('gulp');
var lint = require('gulp-jadelint');

module.exports = function(src) {
  return gulp
    .src(src)
    .pipe(lint());
};
