# common-gulp

A set of gulp helpers that simplify the creation of a Gulpfile significantly.

## usage

Require the module in your Gulpfile

    const common = require('common-gulp');

A number of default tasks are defined, these are visible in the `index.js` file. If you need to customise or override, the actual modules are exposed on exports.

### utility functions

    // download & install bower packages
    gulp.task('bower', function() {
      // use 'bower' directory when none supplied
      return common.bower();
    });

    // copy package.json to dist
    gulp.task('packagejson', function() {
      // destination file/folder, source array
      return common.copy('dist/, ['package.json']);
    });

    // concat & minify js files
    gulp.task('vendor', function() {
      // destination file, destination folder, source array
      return common.jsconcat('vendor.js, 'dist/, [PATHS.bower]);
    });


### testing infrastructure

    // combine all lcov into lconv.info
    gulp.task('coverage', function() {
      // operates on coverage/lcov files
      return common.coverage();
    });

    // karma tests
    gulp.task('test-client', function(done) {
      // no config, uses karma.conf.js in project root
      return common.karma(done);
    });

    // mocha tests
    gulp.task('test-server', function(done) {
      // done callback, source array, spec array
      common.mocha(done, [PATHS.js.server], [PATHS.spec.server]);
    });


### linting

    // jade linting
    gulp.task('lint-jade', function() {
      // source array
      return common.jslint([PATHS.jade.client]);
    });

    // js linting
    gulp.task('lint-js-server', function() {
      // source array, eslint options (optional)
      return common.jslint([PATHS.js.server], JSLINTOPTS.NODE);
    });


### compilation

    // sass compilation
    gulp.task('css', function() {
      // source array, include array (optional)
      return common.sass([PATH.sass.client]);
    });

    // jade compilation
    gulp.task('html', function() {
      // destination folder, source array
      return common.jade('dist/public/, [PATHS.jade]);
    });

    // angular js compilation (via babel, annotate & uglify)
    gulp.task('js-client', function() {
      // destination file, destination folder, source array
      return common.jsangular('client.js, 'dist/public/scripts/, [PATHS.js.client]);
    });

    // node js compilation (via babel)
    gulp.task('js-server', function() {
      // destination folder, source array
      return common.jsnode('dist/, [PATHS.js.server]);
    });


## tasks exposed by default

bower, clean, copy-package.json, coverage, jadelint-client, html-client, jslint-client, jslint-client-spec, jslint-database, jslint-server, jslint-server-spec, jslint-shared, jslint-shared-spec, js-client, js-database, js-server, js-shared, js-vendor, test-client, test-server, test
