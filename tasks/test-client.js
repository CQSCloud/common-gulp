﻿const karma =  require('./base/start-karma');
const gulp = require('gulp');

const task = () => {
  return gulp.series('test-client-prereq', (done) => {
    return karma(done);
  });
};

module.exports = task;
