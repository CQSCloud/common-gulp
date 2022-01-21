const log = require('fancy-log');
const util = require('util');
const colours = require('ansi-colors');

const errorCallback = (error) => {
  if (error) {
    log(`🟥 ${colours.red(
      util.inspect(error.stack || error.message || error)
    )}`);
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
