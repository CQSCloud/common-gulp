'use strict';

/* eslint no-console:0 */

const WIN32 = process.platform === 'win32';
const PREFIX = '  ';
const SUITELEN = 28;
const EOL = require('os').EOL;
const SYMBOLS = {
  dot: '-',
  ok: WIN32 ? '\u221A' : '✓',
  err: WIN32 ? '\u00D7' : '✖'
};

const COLORS = {
  'pass': 32,
  'fail': 31,
  'bright pass': 92,
  'bright fail': 91,
  'bright yellow': 93,
  'pending': 36,
  'suite': 0,
  'error title': 0,
  'error message': 31,
  'error stack': 90,
  'checkmark': 32,
  'fast': 90,
  'medium': 36,
  'slow': 31,
  'green': 32,
  'light': 90,
  'diff gutter': 90,
  'diff added': 42,
  'diff removed': 41
};

const color = function(type, str) {
  return `\u001b[${COLORS[type]}m${str}\u001b[0m`;
};

const wrap = function(tick) {
  return `${tick} `;
};

const newline = function(info) {
  return process.stdout.write(`${EOL}${PREFIX}${color('medium', info || '')} `);
};

const log = function(stats, ch) {
  if (stats.prevSuite !== stats.suites[0]) {
    stats.prevSuite = stats.suites[0];
    newline(`                                  ${stats.prevSuite}`.slice(-SUITELEN));
  }

  if (ch) {
    return process.stdout.write(ch);
  }
};

const suiteStart = function(stats) {
  return function(suite) {
    if (suite.title && suite.title.length) {
      stats.suites.push(suite.title);
    }
  };
};

const suiteEnd = function(stats) {
  return function() {
    if (stats.suites.length) {
      stats.suites.pop();
    }
  };
};

const start = function(stats) {
  return function() {
    stats.number = 0;
    stats.passed = 0;
    stats.failed = 0;
    stats.pending = 0;
    stats.failures = [];
    stats.startTime = Date.now();
    stats.suites = [];
    stats.prevSuite = null;
    newline();
  };
};

const pass = function(stats) {
  return function(test) {
    if (test.suite) {
      stats.suites = test.suite;
    }

    const slow = test.speed === 'slow';

    log(stats, wrap(color((slow ? 'slow' : 'pass'), SYMBOLS.ok)));

    stats.number++;
    stats.passed++;
  };
};

const fail = function(stats) {
  return function(test, err) {
    if (test.suite) {
      stats.suites = test.suite;
    }

    log(stats, wrap(color('fail', SYMBOLS.err)));

    stats.number++;
    stats.failed++;
    test.err = err;
    stats.failures.push(test);
  };
};

const pend = function(stats) {
  return function(test) {
    if (test.suite) {
      stats.suites = test.suite;
    }

    log(stats, wrap(color('light', SYMBOLS.dot)));

    stats.number++;
    stats.pending++;
  };
};

const epilogue = function(stats) {
  var fmt = '' + (color('bright pass', ' ')) + (color('green', ' %d passing')) + (color('light', ' (%s)'));

  console.log();
  console.log(fmt, stats.passed, require('mocha/lib/ms')(stats.duration));

  if (stats.pending) {
    fmt = '' + (color('pending', ' ')) + (color('pending', ' %d pending'));
    console.log(fmt, stats.pending);
  }

  if (stats.failed) {
    fmt = color('fail', '  %d failing');
    console.error(fmt, stats.failed);
    require('mocha/lib/reporters/base').list(stats.failures);
    console.error();
  }

  console.log();
};

const stop = function(stats) {
  return function() {
    stats.duration = Date.now() - stats.startTime;
    process.stdout.write(EOL);
    epilogue(stats);
  };
};

module.exports = {
  start: start,
  stop: stop,
  pass: pass,
  fail: fail,
  pend: pend,
  suite: {
    start: suiteStart,
    end: suiteEnd
  }
};
