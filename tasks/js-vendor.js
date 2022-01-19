const jsConcat = require('./base/jsconcat');
const { series } = require('gulp');
const path = require('path');
const _ = require('lodash');
const bower = require('./bower');

const bundleVendorFiles = (cb) => {
  const bowerrc = require(path.join(process.cwd(), 'bower.json'));
  const bowersrc = _.map(bowerrc.dependencies, (ver, bowerdep) => {
    const main = require(path.join(process.cwd(), 'bower', bowerdep, 'bower.json')).main;
    return _.map(_.isArray(main) ? main : [main], (file) => { // eslint-disable-line no-ternary
      return path.join('bower', bowerdep, file);
    });
  });

  let sources = [];
  _.forEach(_.flatten(bowersrc), (src) => {
    if (/\.js$/.test(src)) {
      if (/jquery/.test(src)) {
        sources.unshift(src);
      } else {
        sources.push(src);
      }
    }
  });

  cb();
};

const task = series(bower, bundleVendorFiles, () => jsConcat('dist/database/', ['src/database/**/*.js']));

task.displayName = 'js-vendor';
task.description = 'Compile and Merge vendor scripts using bower';

module.exports = task;
