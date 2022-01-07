const sass = require('./base/transpile-sass');

const css = () => sass(
  ['spec/compile/test/*.s?ss'],
  [],
  {
    destDir: 'dist/',
    destFile: 'test.css'
  });

module.exports = css;
