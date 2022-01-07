const jsLint =  require('./base/jslint');

const task = () => {
  return jsLint(['src/admin/scripts/**/*.js']);
};

module.exports = task;
