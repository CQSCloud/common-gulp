const errorCallback = require('./error-callback');

const errorAndExitCallback = (error) => {
  errorCallback(error);
  if (!process.env.GULP_WATCH) {
    process.exit(1);
  }
};

module.exports = errorAndExitCallback;
