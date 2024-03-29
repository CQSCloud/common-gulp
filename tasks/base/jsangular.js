'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const annotate = require('gulp-ng-annotate');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const errcb = require('../lib/error-callback');
const { isProduction } = require('../lib/is-env');

const task = (file, dest, src) => {
  return gulp
    .src(src, { allowEmpty: true })
    .pipe(newer('' + dest + file)) // eslint-disable-line prefer-template
    .pipe(eslint({}))
    .pipe(eslint.format())
    .pipe(gulpif(!isProduction(), sourcemaps.init()))
    .pipe(babel({
      babelrc: true
    }))
    .on('error', errcb)
    .pipe(gulpif(isProduction(), annotate()))
    .pipe(gulpif(isProduction(), uglify()))
    .pipe(concat(file))
    .pipe(gulpif(!isProduction(), sourcemaps.write('.', {
      sourceRoot: '/scripts/',
      sourceMappingURLPrefix: '/scripts/'
    })))
    .pipe(gulp.dest(dest));
};

task.displayName = 'jsangular';
task.description = 'Compile AngularJS using Babel, and Node. Uglify and Annotate if production. Generate Source Maps.';

module.exports = task;
