'use strict';

const gulp = require('gulp');
const lint = require('gulp-pug-lint');

const task = (src) => {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(lint());
};

task.displayName = 'puglint';

module.exports = task;
