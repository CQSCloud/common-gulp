const jsNode =  require('./base/jsnode');

const task = () => {
  return jsNode('dist/shared/', ['src/shared/scripts/**/*.js']);
};

task.displayName = 'js-shared';
task.description = 'Compile shared scripts';

module.exports = task;
