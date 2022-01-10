const mocha = require('./base/mocha');

const task = (done) => {
  return mocha(done, [], ['spec/compile/**/*.spec.js']);
};

task.displayName = 'test-compile';
task.description = 'Compile Common-Gulp Tests with Mocha';

module.exports = task;
