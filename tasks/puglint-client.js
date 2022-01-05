const puglint = require('./base/puglint');

const task = () => {
  puglint(['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
};

module.exports = task;
