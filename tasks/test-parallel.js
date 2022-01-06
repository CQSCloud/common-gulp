const gulp = require('gulp');

const task = () => {
    return gulp.series('test-parallel-client-server', 'coverage');
}

module.exports = task;
