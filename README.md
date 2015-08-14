# common-gulp

A set of gulp helpers that simplify the creation of a Gulpfile significantly.

### usage

Require the module in your Gulpfile

    const common = require('common-gulp');


Utility functions

    // copy package.json to dist
    gulp.task('packagejson', function() {
      // destination file/folder, source array
      return common.copy('dist/', ['package.json']);
    });

    // concat & minify js files
    gulp.tasks('vendor', function() {
      // destination file, destination folder, source array
      return common.jsconcat('vendor.js', 'dist/', [PATHS.bower]);
    });


testing infrastructure

    // combine all lcov into lconv.info
    gulp.task('coverage', function() {
      // operates on coverage/lcov files
      return common.coverage();
    });

    // karma tests
    gulp.task('test-client', function() {
      // no config, uses karma.conf.js in project root
      common.karma();
    });

    // mocha tests
    gulp.task('test-server', function(cb) {
      // done callback, source array, spec array
      return common.mocha(cb, [PATHS.js.server], [PATHS.spec.server]);
    });


linting

    // js linting
    gulp.task('lint-js-server', function() {
      // source array, eslint options
      common.jslint([PATHS.js.server], JSLINTOPTS.NODE);
    });


compilation

    // jade compilation
    gulp.task('html', function() {
      // destination folder, source array
      common.jade('dist/public/', [PATHS.jade]);
    });

    // angular js compilation (via babel, annotate & uglify)
    gulp.task('js-client', function() {
      // destination file, destination folder, source array
      return common.jsangular('client.js', 'dist/public/scripts/', [PATHS.js.client]);
    });

    // node js compilation (via babel)
    gulp.task('js-server', function() {
      // destination folder, source array
      common.jsnode('dist/', [PATHS.js.server]);
    });
