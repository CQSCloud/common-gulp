'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
// var istanbul = require('gulp-istanbul');
// var isparta = require('isparta');
const reporter = require('../../lib/reporters').mocha;
// var fs = require('fs');
const exitcb = require('../lib/error-and-exit-callback');

const runMocha = (spec, options) => {
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

const task = (cb, src, spec, _options) => {
  const options = _options || {};

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
    .on('finish', () => {
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
        .on('end', () => {
          cb();
        });
    })
    .on('error', exitcb);
  return undefined;
};

task.displayName = 'mocha';

module.exports = task;
