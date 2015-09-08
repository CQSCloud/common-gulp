'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function(src, opt) {
  return gulp
    .src(src)
    .pipe(eslint(opt || {}))
    .pipe(eslint.format());
};
