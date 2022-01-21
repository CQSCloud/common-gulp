const log = require('fancy-log');
var util = require('util');

const errorCallback = (error) => {
  if (error) {
    // TODO: Look at a colours library to format this text all red, stay over for now is just a red emoji at the start
    const inspection = util.inspect(error.stack || error.message || error, { colors: true, sorted: true });
    log(`🟥 ${inspection}`);
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
