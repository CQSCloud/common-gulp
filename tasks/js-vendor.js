const jsConcat = require('./base/jsconcat');
const gulp = require('gulp');

const task = () => {
    return gulp.series('bower', function() {
        const bowerrc = require(path.join(process.cwd(), 'bower.json'));
        const bowersrc = _.map(bowerrc.dependencies, function(ver, bowerdep) {
            const main = require(path.join(process.cwd(), 'bower', bowerdep, 'bower.json')).main;
            return _.map(_.isArray(main) ? main : [main], function(file) { // eslint-disable-line no-ternary
                return path.join('bower', bowerdep, file);
            });
        });

        let sources = [];
        _.forEach(_.flatten(bowersrc), function(src) {
            if (/\.js$/.test(src)) {
                if (/jquery/.test(src)) {
                    sources.unshift(src);
                } else {
                    sources.push(src);
                }
            }
        });

        return jsConcat('dist/database/', ['src/database/**/*.js']);
    })
}

module.exports = task;
