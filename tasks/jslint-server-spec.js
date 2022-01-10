const jslint =  require('./base/jslint');

const task = () => {
  return jslint(['spec/server/**/*.js']);
};

task.displayName = 'jslint-server-spec';
task.description = 'Eslint Server Test Scripts';

module.exports = task;
