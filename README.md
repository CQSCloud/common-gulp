# common-gulp

A set of gulp helpers that simplify the creation of a Gulpfile significantly.

### usage

    const common = require('common-gulp');

    // copy package.json to dist
    gulp.task('packagejson', function() {
      return common.copy.copy('dist/', ['package.json']);
    });

    // combine all lcov into lconv.info
    gulp.task('coverage', function() {
      return common.coverage.merge();
    });

    // jade compilation
    gulp.task('html', function() {
      common.jade.compile('dist/public/', [PATHS.jade]);
    });

    // js compilation (via babel)
    gulp.task('js-server', function() {
      common.js.compile('dist/', [PATHS.js.server]);
    });

    // js linting
    gulp.task('lint-js-server', function() {
      common.jslint.lint([PATHS.js.server], JSLINTOPTS.NODE);
    });

    // mocha tests
    gulp.task('test-server', function(cb) {
      return common.mocha.test(cb, [PATHS.js.server], [PATHS.spec.server]);
    });
