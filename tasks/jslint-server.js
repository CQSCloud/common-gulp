const jsLint =  require('./base/jslint');

const task = () => {
    return jsLint(['src/server/scripts/**/*.js'])
}

module.exports = task;
