'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const _ = require('lodash');

const isProd = require('../helpers').isProd;

const run = function(file, dest, src) {
  return gulp
    .src(src)
    .pipe(newer('' + dest + file))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(concat(file))
    .pipe(gulp.dest(dest));
};

gulp.task('js-vendor', ['bower'], function() {
  const bowersrc = require('./bower.json');
  const src = _.forEach(bowersrc.dependencies, function(ver, dep) {
    const depsrc = require(`bower/${dep}/bower.json`);
    return `bower/${dep}/${depsrc.main}`;
  });

  return run('vendor.js', 'dist/public/scripts/', src);
});

module.exports = run;
