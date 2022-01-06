const gulp = require('gulp');

const task = () => {
    return gulp.series('jslint-server-spec', 'jslint-shared-spec');
}

module.exports = task;
