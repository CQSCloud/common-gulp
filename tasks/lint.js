const jsLint =  require('./base/jslint');

const lint = () => jsLint(['./index.js', 'tasks/**/*.js']);

module.exports = lint;
