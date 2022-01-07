const sass = require('./base/transpile-sass');

const task = () => {
  return sass(['spec/compile/test/*.s?ss'], [], {
    destDir: 'dist/',
    destFile: 'test.css'
  });
};

module.exports = task;
