const sass = require('./base/transpile-sass');

const task = () => sass(
  ['spec/compile/test/*.s?ss'],
  [],
  {
    destDir: 'dist/',
    destFile: 'test.css'
  });

task.displayName = 'css';
task.description = `${sass.description} to test.css`;

module.exports = task;
