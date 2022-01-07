const gulp = require('gulp');

const task = () => {
  return gulp.series('lint', 'css', 'pug');
};

module.exports = task;
