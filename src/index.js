'use strict';

const gulp = require('gulp');
const del = require('del');
const _ = require('lodash');
const serial = require('run-sequence');
const path = require('path');

const common = {
  bower: require('./gulp/bower'),
  copy: require('./gulp/copy'),
  coverage: require('./gulp/coverage'),
  jade: require('./gulp/jade'),
  jadelint: require('./gulp/jadelint'),
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

gulp.task('clean', function(cb) {
  return del(['coverage', 'dist'], cb);
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

gulp.task('html-client', ['jadelint-client'], function() {
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

gulp.task('js-client', ['jslint-client'], function() {
  return common.jsangular('client.js', 'dist/public/scripts/', ['src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
});

gulp.task('js-database', ['jslint-database'], function() {
  return common.jsnode('dist/database/', ['src/database/**/*.js']);
});

gulp.task('js-server', ['jslint-server'], function() {
  return common.jsnode('dist/', ['src/server/scripts/**/*.js']);
});

gulp.task('js-shared', ['jslint-shared'], function() {
  return common.jsnode('dist/shared/', ['src/shared/scripts/**/*.js']);
});

gulp.task('js-vendor', ['bower'], function() {
  const bowerrc = require(path.join(process.cwd(), 'bower.json'));
  const src = _.map(bowerrc.dependencies, function(ver, dep) {
    const pkgsrc = require(path.join(process.cwd(), 'bower', dep, 'bower.json')).main;
    if (_.isArray(pkgsrc)) {
      for (let i = 0; i < pkgsrc.length; i++) {
        if (/\.js$/.test(pkgsrc[i])) {
          return path.join('bower', dep, pkgsrc[i]);
        }
      }
    } else {
      return path.join('bower', dep, pkgsrc);
    }
  });
  console.error(src);

  return common.jsconcat('vendor.js', 'dist/public/scripts/', src);
});

gulp.task('test-client', ['jslint-client-spec'], function() {
  return common.karma();
});

gulp.task('test-server', ['jslint-server-spec', 'jslint-shared-spec'], function(cb) {
  common.mocha(cb, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], ['spec/server/**/*.spec.js', 'spec/server/**/*.spec.js']);
});

gulp.task('test', function(cb) {
  return serial('test-server', 'test-client', 'coverage', cb);
});

module.exports = common;
