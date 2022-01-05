const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['src/client/scripts/**/*.js'])
}

module.exports = task;
