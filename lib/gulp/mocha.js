'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var reporter = require('../reporters').mocha;

var exitcb = require('../helpers').exitcb;

var runMocha = function(spec) {
  return gulp
    .src(spec)
    .pipe(mocha({
      reporter: reporter,
      timeout: 30000
    }));
};

module.exports = function(cb, src, spec, _options) {
  var options = _options || {};

  require('babel-core/register');

  process.env.NODE_ENV = 'test';

  if (options.noCoverage) {
    return runMocha(spec);
  }

  gulp
    .src(src)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      runMocha(spec)
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
