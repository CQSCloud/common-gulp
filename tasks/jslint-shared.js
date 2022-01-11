const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['src/shared/scripts/**/*.js']);
};

task.displayName = 'jslint-shared';
task.description = 'Eslint Shared Scripts';

module.exports = task;
