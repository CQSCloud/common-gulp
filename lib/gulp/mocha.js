'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');

var babel = require('babel-core/register');
var reporter = require('../reporters').mocha;

var exitcb = require('../helpers').exitcb;

module.exports = function(cb, src, spec) {
  process.env.NODE_ENV = 'test';

  gulp
    .src(src)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp
        .src(spec)
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
