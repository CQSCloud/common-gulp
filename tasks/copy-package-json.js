
const copy = require('./base/copy');

const task = () => {
  copy('dist/', ['package.json']);
};

module.exports = task;
