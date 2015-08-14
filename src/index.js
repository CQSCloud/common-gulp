'use strict';

const js = require('./gulp/js');
const jslint = require('./gulp/jslint');

module.exports = {
  coverage: coverage,
  js: js,
  jslint: jslint,
  mocha: mocha
};
