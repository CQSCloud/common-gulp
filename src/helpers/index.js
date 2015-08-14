'use strict';

const gutil = require('gulp-util');

const isTest = function() {
  return process.env.NODE_ENV === 'test';
};

const isProd = function() {
  return isTest() || process.env.NODE_ENV === 'production';
};

const errcb = function(err) {
  if (err) {
    gutil.log(gutil.colors.red(err.stack || err.message || err));
  }

  if (process.env.GULP_WATCH || process.env.GULP_FAILSAFE) {
    if (typeof this !== 'undefined' && this !== null) {
      if (typeof this.emit === 'function') {
        this.emit('end');
      }
    }
  }
};

const exitcb = function(err) {
  errcb(err);

  if (!process.env.GULP_WATCH) {
    process.exit(1);
  }
};

module.exports = {
  isTest: isTest,
  isProd: isProd,
  errcb: errcb,
  exitcb: exitcb,
  paths: paths
};
