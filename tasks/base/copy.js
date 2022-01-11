'use strict';

const { src, dest } = require('gulp');
const newer = require('gulp-newer');

const task = (destination, source) => src(source, { allowEmpty: true })
  .pipe(newer(destination))
  .pipe(dest(destination));

task.displayName = 'copy';
task.description = 'Copy a src file to the destination specified';

module.exports = task;
