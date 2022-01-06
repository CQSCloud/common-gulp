const gulp = require('gulp');

const task = () => {
    return gulp.series('test-client', 'test-server');
}

module.exports = task;
