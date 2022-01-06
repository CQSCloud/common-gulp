const gulp = require('gulp');

const task = () => {
    return gulp.series('test-server', 'test-client', 'coverage');
}

module.exports = task;
