const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['spec/server/**/*.js'])
}

module.exports = task;
