const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['spec/client/**/*.js']);
};

task.displayName = 'jslint-client-spec';
task.description = 'Eslint Client Test Scripts';

module.exports = task;
