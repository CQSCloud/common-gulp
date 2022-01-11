const puglint = require('./base/puglint');

const task = () => {
  puglint(['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
};

task.displayName = 'puglint-client';
task.description = 'Html Lint AngularJS Client Views';

module.exports = task;
