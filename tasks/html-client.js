const pug = require('./base/pug');

const task = () => {
  pug('dist/public/', ['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
};

module.exports = task;
