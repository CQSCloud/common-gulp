'use strict';

var reporter = require('./reporter');

var stats = {};

var Reporter = function(baseReporterDecorator) {
  baseReporterDecorator(this);

  this._browsers = [1];
  this.onBrowserComplete = function() {};
  this.onBrowserStart = function() {};
  this.onRunStart = reporter.start(stats);
  this.onRunComplete = reporter.stop(stats);

  this.specSuccess = function(browser, result) {
    return reporter.pass(stats)(result);
  };

  this.specFailure = function(browser, result) {
    var test = {
      fullTitle: function() {
        return (result.suite.join(' > ')) + ' > ' + result.description; // eslint-disable-line prefer-template
      }
    };

    result.message = result.log.join('');

    return reporter.fail(stats)(test, result);
  };

  this.specSkipped = function(browser, result) {
    return reporter.pend(stats)(result);
  };
};

Reporter.$inject = ['baseReporterDecorator'];

module.exports = {
  'reporter:mpreporter': ['type', Reporter]
};
