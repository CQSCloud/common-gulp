const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['spec/client/**/*.js']);
}

module.exports = task;
