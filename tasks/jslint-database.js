const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['src/database/**/*.js']);
};

task.displayName = 'jslint-database';
task.description = 'Eslint Database Scripts';

module.exports = task;
