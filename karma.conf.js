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
      'karma-babel-preprocessor',
      'karma-coverage',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-chai-plugins',
      require('./reporters').karma
    ],

    frameworks: [
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon-chai',
      'chai-things'
    ],

    reporters: [
      'coverage',
      'mpreporter'
    ],

    browsers: [
      'PhantomJS'
    ],

    preprocessors: {
      'spec/**/*.js': ['babel']
    },

    reportSlowerThan: 1000,

    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage/',
      subdir: '.',
      file: 'client.lcov'
    }
  });
};
