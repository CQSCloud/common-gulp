const coveralls = require('./base/coveralls');

const task = (done) => {
    return coveralls(done);
}

module.exports = task;
