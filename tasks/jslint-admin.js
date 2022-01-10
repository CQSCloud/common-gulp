const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['src/admin/scripts/**/*.js']);
};

task.displayName = 'jslint-admin';
task.description = 'Eslint Admin Scripts';

module.exports = task;
