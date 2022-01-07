const jsNode =  require('./base/jsnode');

const task = () => {
    return jsNode('dist/', ['src/server/scripts/**/*.js']);
}

module.exports = task;
