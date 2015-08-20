'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const newer = require('gulp-newer');

const run = function(dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest))
    .pipe(babel())
    .pipe(gulp.dest(dest));
};

gulp.task('js-server', ['jslint-server'], function() {
  return run('dist/', ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

module.exports = run;
