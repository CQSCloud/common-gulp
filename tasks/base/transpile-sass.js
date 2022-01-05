'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-clean-css');
const gulpif = require('gulp-if');
const ignore = require('gulp-ignore');
const sass = require('gulp-sass')(require('sass'));

const errcb = require('../lib/error-callback');
const { isProduction } = require('../lib/is-env');

const task = (src, includePaths, _options) => {
  const options = _options || {};
  const destDir = options.destDir || 'dist/public/styles';
  const destFile = options.destFile || 'client.css';
  const ignorePaths = options.ignore || ['**/src/client/styles/application.sass'];

  const cleanedInput = gulp.src(src, { allowEmpty: true }).pipe(ignore.include(true, ignorePaths));

  return cleanedInput
    .pipe(sass({
      sourceComments: 'normal',
      outputStyle: 'expanded',
      includePaths: includePaths || []
    }))
    .on('error', errcb)
    .pipe(ignore.exclude('*.css.map'))
    .pipe(gulpif(isProduction(), cssmin({
      keepBreaks: true,
      keepSpecialComments: 0
    })))
    .pipe(concat(destFile))
    .pipe(gulp.dest(destDir));
};

module.exports = task;
