
const del = require('del');

const task = (cb) => {
  return del(['coverage', 'dist', '.cache-require-paths.json'], cb);
};

task.displayName = 'clean';
task.description = 'Clean coverage/, dist/, .cache-require-paths.json';

module.exports = task;
