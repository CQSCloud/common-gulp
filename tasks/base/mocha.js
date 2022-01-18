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
      require: ['@babel/register']
    }));
};

const task = (cb, src, spec, _options) => {
  const options = _options || {};
  console.log('\x1b[31m%s\x1b[0m', 'spec', spec);
  console.log('\x1b[31m%s\x1b[0m', 'src', src);
  require('@babel/register');
  process.env.NODE_ENV = 'test';
  return runMocha(spec, options.mocha);
};

task.displayName = 'mocha';

module.exports = task;
