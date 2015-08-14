'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');
const mkdirp = require('mkdirp');
const path = require('path');

const babel = require('babel/register');
const reporter = require('../reporters').mocha;

const {exitcb} = require('../helpers');

const test = function(cb, src, spec) {
  process.env.NODE_ENV = 'test';

  mkdirp(path.join(__dirname, '../../coverage'), function() {
    return true;
  });

  gulp.src(src)
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

module.exports = {
  test: test
};
