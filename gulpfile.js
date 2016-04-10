'use strict';

const gulp = require('gulp');
const serial = require('run-sequence');
const common = require('./lib/gulp');

gulp.task('lint', () => {
  return common.jslint(['./index.js', 'lib/**/*.js']);
});

gulp.task('css', () => {
  return common.sass(['spec/compile/test/*.s?ss'], [], {
    destDir: 'dist/',
    destFile: 'test.css'
  });
});

gulp.task('pug', () => {
  return common.pug('dist/', ['spec/compile/test/*.jade']);
});

gulp.task('test-compile', (done) => {
  return common.mocha(done, [], ['spec/compile/**/*.spec.js']);
});

gulp.task('test', (done) => {
  return serial('test-server', 'test-client', 'test-compile', done);
});

gulp.task('default', ['lint', 'css', 'pug']);
