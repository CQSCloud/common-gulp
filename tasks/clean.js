
const del = require('del');

const clean = (cb) => {
  return del(['coverage', 'dist', '.cache-require-paths.json'], cb);
};

module.exports = clean;
