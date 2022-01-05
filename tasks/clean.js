
const del = require('del');

const task = (cb) => {
  return del(['coverage', 'dist', '.cache-require-paths.json'], cb);
};

module.exports = task;
