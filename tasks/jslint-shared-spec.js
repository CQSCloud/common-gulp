const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['spec/shared/**/*.js']);
}

module.exports = task;
