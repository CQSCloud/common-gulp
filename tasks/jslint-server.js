const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['src/server/scripts/**/*.js']);
};

task.displayName = 'jslint-server';
task.description = 'Eslint Server Scripts';

module.exports = task;
