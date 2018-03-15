'use strict';

var gulp = require('gulp');
var del = require('del');
var _ = require('lodash');
var serial = require('run-sequence');
var path = require('path');
var Promise = require('bluebird').Promise;

const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

var common = {
  awsdeployeb: require('./aws-deploy-eb'),
  bower: require('./bower'),
  copy: require('./copy'),
  coverage: require('./coverage'),
  coveralls: require('./coveralls'),
  cssconcat: require('./cssconcat'),
  githubmaster: require('./github-master'),
  jsangular: require('./jsangular'),
  jsconcat: require('./jsconcat'),
  jslint: require('./jslint'),
  jsnode: require('./jsnode'),
  karma: require('./karma'),
  mocha: require('./mocha'),
  pivotal: require('./pivotal'),
  pug: require('./pug'),
  puglint: require('./puglint'),
  sass: require('./sass'),
  uglify: require('./uglify')
};

gulp.task('aws-deploy-eb', function(done) {
  return common.awsdeployeb(done);
});

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

gulp.task('coveralls', function(done) {
  return common.coveralls(done);
});

gulp.task('github-master', function(done) {
  return common.githubmaster(done);
});

gulp.task('puglint-client', function() {
  return common.puglint(['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
});

gulp.task('html-client', function() {
  return common.pug('dist/public/', ['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
});

gulp.task('jslint-admin', function() {
  return common.jslint(['src/admin/scripts/**/*.js']);
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

gulp.task('js-admin', function() {
  return common.jsangular('ncc1701.js', 'dist/public/scripts/', ['src/admin/scripts/**/*.js']);
});

gulp.task('js-client', function() {
  return common.jsangular('client.js', 'dist/public/scripts/', [
    'src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js'
  ]);
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
    return _.map(_.isArray(main) ? main : [main], function(file) { // eslint-disable-line no-ternary
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

gulp.task('pivotal', function(done) {
  return common.pivotal(done);
});

gulp.task('test-client-prereq', ['jslint-client-spec']);

gulp.task('test-client', ['test-client-prereq'], function(done) {
  return common.karma(done);
});

gulp.task('test-server-prereq', ['jslint-server-spec', 'jslint-shared-spec']);

gulp.task('copy-test-files', () => {
  gulp.src('src/server/scripts/**/*.ts', { base: '.' })
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('test'));

  return new Promise(resolver => {
    common.copy('test/src/shared', 'src/shared/**/*.*')
      .on('finish', () => {
        common.copy('test/src/cwIntegration', 'src/cwIntegration/**/*.*')
          .on('finish', () => {
            common.copy('test/src/database', 'src/database/**/*.*')
              .on('finish', () => {
                common.copy('test/src/server', 'src/server/**/*.*')
                  .on('finish', () => {
                    resolver();
                  });
              });
          });
      });
  });
});

gulp.task('test-ts-server', ['test-server-prereq', 'copy-test-files'], function(done) {
  common.mocha(done,
    ['test/src/server/scripts/**/*.js', 'test/src/shared/scripts/**/*.js'],
    ['spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js']);
});

gulp.task('test-server', ['test-server-prereq'], function(done) {
  return common.mocha(done, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], [
    'spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js'
  ]);
});

gulp.task('test', function(done) {
  return serial('test-server', 'test-client', 'coverage', done);
});

gulp.task('-test-parallel-', ['test-client', 'test-server']);

gulp.task('test-parallel', function(done) {
  process.env.TEST_PARALLEL = 'true';
  return serial('-test-parallel-', 'coverage', done);
});

module.exports = common;
