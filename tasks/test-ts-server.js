const gulp = require('gulp');
const mocha = require('./base/mocha');

const task = () => {
    return gulp.series('test-server-prereq', 'copy-test-files', (done) => {
        mocha(done,
            ['test/src/server/scripts/**/*.js', 'test/src/shared/scripts/**/*.js'],
            ['spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js']);
    });
}

module.exports = task;
