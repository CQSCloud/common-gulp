'use strict';

module.exports = function(config) {
  config.set({
    logLevel: 'INFO',
    singleRun: true,
    basePath: './',

    files: [
      'spec/client/**/*.spec.js'
    ],

    plugins: [
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-chai-plugins',
      require('./lib/reporters').karma
    ],

    frameworks: [
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon-chai',
      'chai-things'
    ],

    reporters: [
      'mpreporter'
    ],

    browsers: [
      'PhantomJS'
    ]
  });
};
