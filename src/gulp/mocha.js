'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');

const babel = require('babel-core/register');
const reporter = require('../reporters').mocha;

const exitcb = require('../helpers');

const run = function(cb, src, spec) {
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

gulp.task('test-server', ['jslint-server-spec'], function(cb) {
  return run(cb, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], ['spec/server/**/*.spec.js', 'spec/server/**/*.spec.js']);
});

module.exports = run;
