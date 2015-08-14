'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');

const babel = require('babel/register');
const reporter = require('../reporters').mocha;

const {exitcb} = require('../helpers');

module.exports = function(cb, src, spec) {
  process.env.NODE_ENV = 'test';

  gulp
    .src(src)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(spec)
        .pipe(mocha({
          reporter: reporter,
          compilers: {
            js: babel
          }
        }))
        .pipe(istanbul.writeReports({
          dir: './coverage',
          reporters: ['lcovonly'],
          reportOpts: {
            lcovonly: {
              dir: './coverage',
              file: 'server.lcov'
            }
          }
        }))
        .on('end', cb);
    })
    .on('error', exitcb);
};
