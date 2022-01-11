const pug = require('./base/pug');

const task = () => {
  pug('dist/public/', ['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
};

task.displayName = 'html-client';
task.description = 'Compile Pug Templates';

module.exports = task;
