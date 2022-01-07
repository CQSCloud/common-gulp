const jsNode =  require('./base/jsnode');

const task = () => {
  return jsNode('dist/shared/', ['src/shared/scripts/**/*.js']);
};

module.exports = task;
