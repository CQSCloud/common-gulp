const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['src/client/scripts/**/*.js']);
};

task.displayName = 'jslint-client';
task.description = 'Eslint Client Scripts';

module.exports = task;
