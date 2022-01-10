const jsNode =  require('./base/jsnode');

const task = () => {
  return jsNode('dist/', ['src/server/scripts/**/*.js']);
};

task.displayName = 'js-server';
task.description = 'Compile server scripts';

module.exports = task;
