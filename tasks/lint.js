const jsLint =  require('./base/jslint');

const task = () => jsLint(['./index.js', 'tasks/**/*.js']);

task.displayName = 'lint';
task.description = 'Eslint Gulp Tasks';

module.exports = task;
