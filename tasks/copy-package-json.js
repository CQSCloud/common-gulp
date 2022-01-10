
const copy = require('./base/copy');

const task = () => {
  copy('dist/', ['package.json']);
};

task.displayName = 'copy-package.json';
task.description = 'Copy package.json to dist/';

module.exports = task;
