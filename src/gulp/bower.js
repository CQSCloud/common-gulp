'use strict';

const gulp = require('gulp');
const bower = require('gulp-bower');

const run = function(dest = 'bower') {
  return bower({ directory: dest })
    .pipe(gulp.dest(dest));
};

gulp.task('bower', function() {
  return run();
});

module.exports = run;
