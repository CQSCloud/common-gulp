const jsNode =  require('./base/jsnode');

const task = () => {
  return jsNode('dist/database/', ['src/database/**/*.js']);
};

task.displayName = 'js-database';
task.description = 'Compile database scripts';

module.exports = task;
