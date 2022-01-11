const util = require('gulp-util');

const errorCallback = (error) => {
  if (error) {
    util.log(util.colors.red(error.stack || error.message || error));
  }

  if (process.env.GULP_WATCH || process.env.GULP_FAILSAFE) {
    if (typeof this !== 'undefined' && this !== null) {
      if (typeof this.emit === 'function') {
        this.emit('end');
      }
    }
  }
};

module.exports = errorCallback;
