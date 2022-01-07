const jsAngular =  require('./base/jsangular');

const task = () => {
  return jsAngular('client.js', 'dist/public/scripts/', ['src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
};

module.exports = task;
