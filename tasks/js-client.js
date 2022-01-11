const jsAngular =  require('./base/jsangular');

const task = () => {
  return jsAngular('client.js', 'dist/public/scripts/', ['src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js']);
};

task.displayName = 'js-client';
task.description = 'Compile client scripts for AngularJS';

module.exports = task;
