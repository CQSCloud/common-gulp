const jsAngular =  require('./base/jsangular');

const task = () => {
  return jsAngular('ncc1701.js', 'dist/public/scripts/', ['src/admin/scripts/**/*.js']);
};

task.displayName = 'js-admin';
task.description = 'Compile admin scripts for AngularJS';

module.exports = task;
