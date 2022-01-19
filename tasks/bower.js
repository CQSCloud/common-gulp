const bowerwrapper = require('./base/bower-wrapper');

const task = () => bowerwrapper('bower');
task.displayName = 'bower';
task.description = 'Run bower with the default output directory (/bower)';

module.exports = task;
