'use strict';

var gulp = require('gulp');
var del = require('del');
var _ = require('lodash');
var serial = require('run-sequence');
var path = require('path');

var common = {
  bower: require('./bower'),
  copy: require('./copy'),
  coverage: require('./coverage'),
  cssconcat: require('./cssconcat'),
  jade: require('./jade'),
  jadelint: require('./jadelint'),
  jsangular: require('./jsangular'),
  jsconcat: require('./jsconcat'),
  jslint: require('./jslint'),
  jsnode: require('./jsnode'),
  karma: require('./karma'),
  mocha: require('./mocha'),
  sass: require('./sass')
};

gulp.task('bower', function() {
  return common.bower();
});

gulp.task('clean', function(done) {
  return del(['coverage', 'dist', '.cache-require-paths.json'], done);
});

gulp.task('copy-package.json', function() {
  return common.copy('dist/', ['package.json']);
});

gulp.task('coverage', function() {
  return common.coverage();
});

gulp.task('jadelint-client', function() {
  return common.jadelint(['src/client/views/**/*.jade']);
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

gulp.task('jslint-database', function() {
  return common.jslint(['src/database/**/*.js']);
});

gulp.task('jslint-server', function() {
  return common.jslint(['src/server/scripts/**/*.js']);
});

gulp.task('jslint-server-spec', function() {
  return common.jslint(['spec/server/**/*.js']);
});

gulp.task('jslint-shared', function() {
  return common.jslint(['src/shared/scripts/**/*.js']);
});

gulp.task('jslint-shared-spec', function() {
  return common.jslint(['spec/shared/**/*.js']);
});

gulp.task('js-client', function() {
  return common.jsangular('client.js', 'dist/public/scripts/', ['src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('js-database', function() {
  return common.jsnode('dist/database/', ['src/database/**/*.js']);
});

gulp.task('js-server', function() {
  return common.jsnode('dist/', ['src/server/scripts/**/*.js']);
});

gulp.task('js-shared', function() {
  return common.jsnode('dist/shared/', ['src/shared/scripts/**/*.js']);
});

gulp.task('js-vendor', ['bower'], function() {
  var bowerrc = require(path.join(process.cwd(), 'bower.json'));
  var bowersrc = _.map(bowerrc.dependencies, function(ver, bowerdep) {
    var main = require(path.join(process.cwd(), 'bower', bowerdep, 'bower.json')).main;
    return _.map(_.isArray(main) ? main : [main], function(file) {
      return path.join('bower', bowerdep, file);
    });
  });

  var sources = [];
  _.forEach(_.flatten(bowersrc), function(src) {
    if (/\.js$/.test(src)) {
      if (/jquery/.test(src)) {
        sources.unshift(src);
      } else {
        sources.push(src);
      }
    }
  });

  return common.jsconcat('vendor.js', sources);
});

gulp.task('test-client', ['jslint-client-spec'], function(done) {
  return common.karma(done);
});

gulp.task('test-server', ['jslint-server-spec', 'jslint-shared-spec'], function(done) {
  return common.mocha(done, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], ['spec/server/**/*.spec.js', 'spec/server/**/*.spec.js']);
});

gulp.task('test', function(done) {
  return serial('test-server', 'test-client', 'coverage', done);
});

module.exports = common;
