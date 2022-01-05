const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['src/shared/scripts/**/*.js'])
}

module.exports = task;
