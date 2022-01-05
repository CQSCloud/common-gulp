'use strict';

const _ = require('lodash');
const path = require('path');
const karma = require('karma');

const task = (cb, options) => {
  new karma.Server(
    _.merge({
      configFile: path.join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, options || {}), cb).start();
};

module.exports = task;
