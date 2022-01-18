module.exports = {
  'aws-deploy-eb': require('./tasks/exec/exec-aws-deploy-eb'),
  'bower': require('./tasks/bower'),
  'copy-package.json': require('./tasks/copy-package-json'),
  'coverage': require('./tasks/base/coverage'),
  'clean': require('./tasks/clean'),
  'coveralls': require('./tasks/base/coveralls'),
  'css': require('./tasks/css'),
  'default': require('./tasks/default'),
  'github-master': require('./tasks/exec/exec-github-master'),
  'html-client': require('./tasks/html-client'),
  'js-admin': require('./tasks/js-admin'),
  'js-client': require('./tasks/js-client'),
  'js-database': require('./tasks/js-database'),
  'js-server': require('./tasks/js-server'),
  'js-shared': require('./tasks/js-shared'),
  'js-vendor': require('./tasks/js-vendor'),
  'jsangular': require('./tasks/base/jsangular'),
  'jsconcat': require('./tasks/base/jsconcat'),
  'jslint': require('./tasks/base/jslint'),
  'jslint-admin': require('./tasks/jslint-admin'),
  'jslint-client': require('./tasks/jslint-client'),
  'jslint-client-spec': require('./tasks/jslint-client-spec'),
  'jslint-database': require('./tasks/jslint-database'),
  'jslint-server': require('./tasks/jslint-server'),
  'jslint-server-spec': require('./tasks/jslint-server-spec'),
  'jslint-shared': require('./tasks/jslint-shared'),
  'jslint-shared-spec': require('./tasks/jslint-shared-spec'),
  'jsnode': require('./tasks/base/jsnode'),
  'karma': require('./tasks/base/start-karma'),
  'lint': require('./tasks/lint'),
  'mocha': require('./tasks/base/mocha'),
  'pug': require('./tasks/pug-test'),
  'puglint': require('./tasks/base/puglint'),
  'puglint-client': require('./tasks/puglint-client'),
  'pivotal': require('./tasks/exec/exec-pivotal'),
  'sass': require('./tasks/base/transpile-sass'),
  'test-client-prereq': require('./tasks/test-client-prereq'),
  'test-client': require('./tasks/test-client'),
  'test-server-prereq': require('./tasks/test-server-prereq'),
  'test-ts-server': require('./tasks/test-ts-server'),
  'test-server': require('./tasks/test-server'),
  'test': require('./tasks/test'),
  '-test-parallel-': require('./tasks/test-parallel-client-server'),
  'test-parallel': require('./tasks/test-parallel'),
  'test-compile': require('./tasks/test-compile'),
  'uglify': require('./tasks/base/uglify'),
  'test-self': require('./tasks/test-self')
};
