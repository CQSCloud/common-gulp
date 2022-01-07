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
    // gulp.task('test', (done) => {
    //   return serial('test-server', 'test-client', 'test-compile', done);
    // });
  }
}
module.exports = CommonRegistry;
