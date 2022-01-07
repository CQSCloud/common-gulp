const pug = require('./base/pug');

const pugTest = () => pug('dist/', ['spec/compile/test/*.jade']);

module.exports = pugTest;
