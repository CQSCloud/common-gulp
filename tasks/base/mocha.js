'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
// var istanbul = require('gulp-istanbul');
// var isparta = require('isparta');
var reporter = require('../../lib/reporters').mocha;
// var fs = require('fs');
var exitcb = require('../lib/error-and-exit-callback');

var runMocha = function(spec, options) {
  return gulp
    .src(spec, { allowEmpty: true })
    .pipe(mocha(options || {
      reporter: reporter,
      timeout: 30000,
      require: ['@babel/register'],
      nyc: {
        reportDir: './coverage'
      },
      output: 'result.log' // fs.createWriteStream('result.log', { flags: 'w' }) //
    }));
};

module.exports = function(cb, src, spec, _options) {
  var options = _options || {};

  require('@babel/register');
  process.env.NODE_ENV = 'test';
  if (true) { // options.noCoverage) {
    return runMocha(spec, options.mocha);
  }
  let localSrc = 'src/**/*.js';
  if (src && src.length > 0 && src !== '') {
    localSrc = src;
  }
  gulp
    .src(localSrc, { allowEmpty: true })
    // .pipe(istanbul({
    //   instrumenter: isparta.Instrumenter
    // }))
    // .pipe(istanbul.hookRequire())
    .on('finish', function() {
      runMocha(spec, options.mocha)
        // .pipe(istanbul.writeReports({
        //   dir: './coverage',
        //   reporters: ['lcovonly'],
        //   reportOpts: {
        //     lcovonly: {
        //       dir: './coverage',
        //       file: 'server.lcov'
        //     }
        //   }
        // }))
        .on('end', function() {
          cb();
        });
    })
    .on('error', exitcb);
  return undefined;
};
