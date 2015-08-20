'use strict';

const gulp = require('gulp');
const _ = require('lodash');
const serial = require('run-sequence');

const bower = require('./gulp/bower');
const copy = require('./gulp/copy');
const coverage = require('./gulp/coverage');
const jade = require('./gulp/jade');
const jsangular = require('./gulp/jsangular');
const jsconcat = require('./gulp/jsconcat');
const jslint = require('./gulp/jslint');
const jsnode = require('./gulp/jsnode');
const karma = require('./gulp/karma');
const mocha = require('./gulp/mocha');

gulp.task('bower', function() {
  return bower();
});

gulp.task('copy-package.json', function() {
  return copy('dist/', ['package.json']);
});

gulp.task('coverage', function() {
  return coverage();
});

gulp.task('html-client', function() {
  return jade('dist/public/', ['src/client/views/**/*.jade']);
});

gulp.task('jslint-client', function() {
  return jslint(['src/client/scripts/**/*.js']);
});

gulp.task('jslint-client-spec', function() {
  return jslint(['spec/client/**/*.js']);
});

gulp.task('jslint-server', function() {
  return jslint(['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('jslint-server-spec', function() {
  return jslint(['spec/server/**/*.js', 'spec/shared/**/*.js']);
});

gulp.task('js-client', ['jslint-client'], function() {
  return jsangular('client.js', 'dist/public/scripts/', ['src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('js-server', ['jslint-server'], function() {
  return jsnode('dist/', ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('js-vendor', ['bower'], function() {
  const bowersrc = require('./bower.json');
  const src = _.forEach(bowersrc.dependencies, function(ver, dep) {
    const depsrc = require(`bower/${dep}/bower.json`);
    return `bower/${dep}/${depsrc.main}`;
  });

  return jsconcat('vendor.js', 'dist/public/scripts/', src);
});

gulp.task('test-client', ['jslint-client-spec'], function() {
  return karma();
});

gulp.task('test-server', ['jslint-server-spec'], function(cb) {
  return mocha(cb, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], ['spec/server/**/*.spec.js', 'spec/server/**/*.spec.js']);
});

gulp.task('test', function(cb) {
  return serial('test-server', 'test-client', 'coverage', cb);
});

module.exports = {
  bower: bower,
  copy: copy,
  coverage: coverage,
  jade: jade,
  jsangular: jsangular,
  jsconcat: jsconcat,
  jslint: jslint,
  jsnode: jsnode,
  karma: karma,
  mocha: mocha
};
