const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['./index.js', 'lib/**/*.js']);
}

module.exports = task;
