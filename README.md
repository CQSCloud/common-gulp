# common-gulp

A set of gulp helpers that simplify the creation of a Gulpfile significantly.

### usage

    const common = require('common-gulp');

    // coverage merger
    gulp.task('coverage', function() {
      return common.coverage.merge();
    });

    // babel compilation
    gulp.task('js-server', function() {
      common.js.compile('.', [PATHS.js.server]);
    });

    // js linting
    gulp.task('lint-js-server', function() {
      common.jslint.lint([PATHS.js.server], JSLINTOPTS.NODE);
    });

    // mocha tests
    gulp.task('test-server', function(cb) {
      return common.mocha.test(cb, [PATHS.js.server], [PATHS.spec.server]);
    });
