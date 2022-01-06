const gulp = require('gulp');

const task = () => {
    return gulp.series('jslint-client-spec');
}

module.exports = task;
