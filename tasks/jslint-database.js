const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['src/database/**/*.js'])
}

module.exports = task;
