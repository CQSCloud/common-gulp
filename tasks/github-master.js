const githubMaster = require('./exec/exec-github-master');

const task = (done) => {
    return githubMaster(done);
}

module.exports = task;
