'use strict';

const gulp = require('gulp');
const karma = require('gulp-karma');

const exitcb = require('../helpers').exitcb;

module.exports = function() {
  return gulp
    .src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', exitcb);
};
