module.exports = {
  awsebdeploy: require('./tasks/exec/exec-aws-deploy-eb'),
  bower: require('./tasks/base/bower'),
  copyPackageJson: require('./tasks/copy-package-json'),
  clean: require('./tasks/clean'),
  coverage: require('./tasks/base/coverage'),
  githubmaster: require('./tasks/exec/exec-github-master'),
  jsangular: require('./tasks/base/jsangular'),
  jsconcat: require('./tasks/base/jsconcat'),
  jslint: require('./tasks/base/jslint'),
  jsnode: require('./tasks/base/jsnode'),
  mocha: require('./tasks/base/mocha'),
  pug: require('./tasks/base/pug'),
  puglint: require('./tasks/base/puglint'),
  puglintClient: require('./tasks/puglint-client'),
  karma: require('./tasks/base/start-karma'),
  pivotal: require('./tasks/exec/exec-pivotal'),
  sass: require('./tasks/base/transpile-sass'),
  uglify: require('./tasks/base/uglify'),
  lint: require('./tasks/lint'),
  jslintAdmin: require('./tasks/jslint-admin'),
  jslintClient: require('./tasks/jslint-client'),
  jslintClientSpec: require('./tasks/jslint-client-spec'),
  jslintDatabase: require('./tasks/jslint-database'),
  jslintServer: require('./tasks/jslint-server'),
  jslintServerSpec: require('./tasks/jslint-server-spec'),
  jslintShared: require('./tasks/jslint-shared'),
  jslintSharedSpec: require('./tasks/jslint-shared-spec'),
  jsAdmin: require('./tasks/js-admin'),
  jsClient: require('./tasks/js-client'),
  jsDatabase: require('./tasks/js-database'),
  jsServer: require('./tasks/js-server'),
  jsShared: require('./tasks/js-shared'),
};
