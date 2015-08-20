'use strict';

const gulp = require('gulp');
const _ = require('lodash');
const serial = require('run-sequence');

const common = {
  bower: require('./gulp/bower'),
  copy: require('./gulp/copy'),
  coverage: require('./gulp/coverage'),
  jade: require('./gulp/jade'),
  jsangular: require('./gulp/jsangular'),
  jsconcat: require('./gulp/jsconcat'),
  jslint: require('./gulp/jslint'),
  jsnode: require('./gulp/jsnode'),
  karma: require('./gulp/karma'),
  mocha: require('./gulp/mocha')
};

gulp.task('bower', function() {
  return common.bower();
});

gulp.task('copy-package.json', function() {
  return common.copy('dist/', ['package.json']);
});

gulp.task('coverage', function() {
  return common.coverage();
});

gulp.task('html-client', function() {
  return common.jade('dist/public/', ['src/client/views/**/*.jade']);
});

gulp.task('jslint-client', function() {
  return common.jslint(['src/client/scripts/**/*.js']);
});

gulp.task('jslint-client-spec', function() {
  return common.jslint(['spec/client/**/*.js']);
});

gulp.task('jslint-server', function() {
  return common.jslint(['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('jslint-server-spec', function() {
  return common.jslint(['spec/server/**/*.js', 'spec/shared/**/*.js']);
});

gulp.task('js-client', ['jslint-client'], function() {
  return common.jsangular('client.js', 'dist/public/scripts/', ['src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('js-server', ['jslint-server'], function() {
  return common.jsnode('dist/', ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('js-vendor', ['bower'], function() {
  const bowersrc = require('./bower.json');
  const src = _.forEach(bowersrc.dependencies, function(ver, dep) {
    const depsrc = require(`bower/${dep}/bower.json`);
    return `bower/${dep}/${depsrc.main}`;
  });

  return common.jsconcat('vendor.js', 'dist/public/scripts/', src);
});

gulp.task('test-client', ['jslint-client-spec'], function() {
  return common.karma();
});

gulp.task('test-server', ['jslint-server-spec'], function(cb) {
  return common.mocha(cb, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], ['spec/server/**/*.spec.js', 'spec/server/**/*.spec.js']);
});

gulp.task('test', function(cb) {
  return serial('test-server', 'test-client', 'coverage', cb);
});

module.exports = common;
