'use strict';

var gulp = require('gulp');
var lint = require('gulp-pug-lint');

module.exports = function(src) {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(lint());
};
