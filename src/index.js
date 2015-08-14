'use strict';

const coverage = require('./gulp/coverage');
const js = require('./gulp/js');
const jslint = require('./gulp/jslint');
const mocha = require('./gulp/mocha');

module.exports = {
  copy: copy,
  coverage: coverage,
  jade: jade,
  js: js,
  jslint: jslint,
  mocha: mocha
};
