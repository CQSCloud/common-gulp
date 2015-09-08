'use strict';

var gutil = require('gulp-util');

var isTest = function() {
  return process.env.NODE_ENV === 'test';
};

var isProd = function() {
  return isTest() || process.env.NODE_ENV === 'production';
};

var errcb = function(err) {
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

var exitcb = function(err) {
  errcb(err);

  if (!process.env.GULP_WATCH) {
    process.exit(1);
  }
};

module.exports = {
  isTest: isTest,
  isProd: isProd,
  errcb: errcb,
  exitcb: exitcb
};
