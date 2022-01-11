const { series } = require('gulp');
const lint = require('./lint');
const css = require('./css');
const pugTest = require('./pug-test');

module.exports = series(lint, css, pugTest);
