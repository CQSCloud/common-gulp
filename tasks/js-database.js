const jsNode =  require('./base/jsnode');

const task = () => {
    return jsNode('dist/database/', ['src/database/**/*.js']);
}

module.exports = task;
