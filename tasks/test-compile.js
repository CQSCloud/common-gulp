const mocha = require('./base/mocha');

const task = (done) => {
  return mocha(done, [], ['spec/compile/**/*.spec.js']);
};

module.exports = task;
