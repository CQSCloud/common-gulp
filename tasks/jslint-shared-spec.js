const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['spec/shared/**/*.js']);
};

task.displayName = 'jslint-shared-spec';
task.description = 'Eslint Shared Test Scripts';

module.exports = task;
