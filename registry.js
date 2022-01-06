const DefaultRegistry = require('undertaker-registry');
var del = require('del');
var _ = require('lodash');
// var serial = require('run-sequence');
var path = require('path');
var Promise = require('bluebird').Promise;

const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
class CommonRegistry extends DefaultRegistry {
  constructor() {
    super();
  }
  init(gulp) {
    var common = {
      awsdeployeb: require('./lib/gulp/aws-deploy-eb'),
      bower: require('./lib/gulp/bower'),
      copy: require('./lib/gulp/copy'),
      coverage: require('./lib/gulp/coverage'),
      coveralls: require('./lib/gulp/coveralls'),
      cssconcat: require('./lib/gulp/cssconcat'),
      githubmaster: require('./lib/gulp/github-master'),
      jsangular: require('./lib/gulp/jsangular'),
      jsconcat: require('./lib/gulp/jsconcat'),
      jslint: require('./lib/gulp/jslint'),
      jsnode: require('./lib/gulp/jsnode'),
      karma: require('./lib/gulp/karma'),
      mocha: require('./lib/gulp/mocha'),
      pivotal: require('./lib/gulp/pivotal'),
      pug: require('./lib/gulp/pug'),
      puglint: require('./lib/gulp/puglint'),
      sass: require('./lib/gulp/sass'),
      uglify: require('./lib/gulp/uglify')
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

    gulp.task('test', gulp.series('test-server', 'test-client', 'test-compile'));

    // gulp.task('test', (done) => {
    //   return serial('test-server', 'test-client', 'test-compile', done);
    // });

    gulp.task('default', gulp.series('lint', 'css', 'pug'));
  }
}
module.exports = CommonRegistry;
