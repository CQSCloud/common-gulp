'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
const reporter = require('../../lib/reporters').mocha;

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
  require('@babel/register');
  process.env.NODE_ENV = 'test';
  return runMocha(spec, options.mocha);
};

task.displayName = 'mocha';

module.exports = task;
