const pug = require('./base/pug');

const task = () => pug('dist/', ['spec/compile/test/*.jade']);

task.displayName = 'pug';
task.description = 'Compile Test Html from Pug Templates';

module.exports = task;
