const DefaultRegistry = require('undertaker-registry');
var del = require('del');
var _ = require('lodash');
// var serial = require('run-sequence');
var path = require('path');
var Promise = require('bluebird').Promise;

const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
class CommonRegistry extends DefaultRegistry {
  constructor() {
    super();
  }
  init(gulp) {
    var common = {
      awsdeployeb: require('./lib/gulp/aws-deploy-eb'),
      bower: require('./lib/gulp/bower'),
      copy: require('./lib/gulp/copy'),
      coverage: require('./lib/gulp/coverage'),
      coveralls: require('./lib/gulp/coveralls'),
      cssconcat: require('./lib/gulp/cssconcat'),
      githubmaster: require('./lib/gulp/github-master'),
      jsangular: require('./lib/gulp/jsangular'),
      jsconcat: require('./lib/gulp/jsconcat'),
      jslint: require('./lib/gulp/jslint'),
      jsnode: require('./lib/gulp/jsnode'),
      karma: require('./lib/gulp/karma'),
      mocha: require('./lib/gulp/mocha'),
      pivotal: require('./lib/gulp/pivotal'),
      pug: require('./lib/gulp/pug'),
      puglint: require('./lib/gulp/puglint'),
      sass: require('./lib/gulp/sass'),
      uglify: require('./lib/gulp/uglify')
    };

    gulp.task('aws-deploy-eb', function(done) {
      return common.awsdeployeb(done);
    });

    gulp.task('bower', function() {
      return common.bower();
    });

    gulp.task('clean', function(done) {
      return del(['coverage', 'dist', '.cache-require-paths.json'], done);
    });

    gulp.task('copy-package.json', function() {
      return common.copy('dist/', ['package.json']);
    });

    gulp.task('coverage', function() {
      return common.coverage();
    });

    gulp.task('coveralls', function(done) {
      return common.coveralls(done);
    });

    gulp.task('github-master', function(done) {
      return common.githubmaster(done);
    });

    gulp.task('puglint-client', function() {
      return common.puglint(['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
    });

    gulp.task('html-client', function() {
      return common.pug('dist/public/', ['src/client/views/**/*.jade', 'src/client/views/**/*.pug']);
    });

    gulp.task('js-admin', function() {
      return common.jsangular('ncc1701.js', 'dist/public/scripts/', ['src/admin/scripts/**/*.js']);
    });

    gulp.task('js-client', function() {
      return common.jsangular('client.js', 'dist/public/scripts/', [
        'src/client/scripts/**/*.js', 'src/shared/scripts/**/*.js'
      ]);
    });

    gulp.task('js-database', function() {
      return common.jsnode('dist/database/', ['src/database/**/*.js']);
    });

    gulp.task('js-server', function() {
      return common.jsnode('dist/', ['src/server/scripts/**/*.js']);
    });

    gulp.task('js-shared', function() {
      return common.jsnode('dist/shared/', ['src/shared/scripts/**/*.js']);
    });

    gulp.task('js-vendor', gulp.series('bower', function() {
      var bowerrc = require(path.join(process.cwd(), 'bower.json'));
      var bowersrc = _.map(bowerrc.dependencies, function(ver, bowerdep) {
        var main = require(path.join(process.cwd(), 'bower', bowerdep, 'bower.json')).main;
        return _.map(_.isArray(main) ? main : [main], function(file) { // eslint-disable-line no-ternary
          return path.join('bower', bowerdep, file);
        });
      });

      var sources = [];
      _.forEach(_.flatten(bowersrc), function(src) {
        if (/\.js$/.test(src)) {
          if (/jquery/.test(src)) {
            sources.unshift(src);
          } else {
            sources.push(src);
          }
        }
      });

      return common.jsconcat('vendor.js', sources);
    }));

    gulp.task('pivotal', function(done) {
      return common.pivotal(done);
    });

    gulp.task('test-client-prereq', gulp.series('jslint-client-spec'));

    gulp.task('test-client', gulp.series('test-client-prereq', function(done) {
      return common.karma(done);
    }));

    gulp.task('test-server-prereq', gulp.series('jslint-server-spec', 'jslint-shared-spec'));

    gulp.task('copy-test-files', () => {
      gulp.src('src/server/scripts/**/*.ts', {
        base: '.'
      }, {
        allowEmpty: true
      })
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('test'));

      return new Promise(resolver => {
        common.copy('test/src/shared', 'src/shared/**/*.*')
          .on('finish', () => {
            common.copy('test/src/cwIntegration', 'src/cwIntegration/**/*.*')
              .on('finish', () => {
                common.copy('test/src/database', 'src/database/**/*.*')
                  .on('finish', () => {
                    common.copy('test/src/server', 'src/server/**/*.*')
                      .on('finish', () => {
                        resolver();
                      });
                  });
              });
          });
      });
    });

    gulp.task('test-ts-server', gulp.series('test-server-prereq', 'copy-test-files', function(done) {
      common.mocha(done,
        ['test/src/server/scripts/**/*.js', 'test/src/shared/scripts/**/*.js'],
        ['spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js']);
    }));

    gulp.task('test-server', gulp.series('test-server-prereq', function(done) {
      return common.mocha(done, ['src/server/scripts/**/*.js', 'src/shared/scripts/**/*.js'], [
        'spec/server/helpers/index.js', 'spec/shared/**/*.spec.js', 'spec/server/**/*.spec.js'
      ]);
    }));

    gulp.task('test', gulp.series('test-server', 'test-client', 'coverage'));

    gulp.task('-test-parallel-', gulp.series('test-client', 'test-server'));

    gulp.task('test-parallel', gulp.series('-test-parallel-', 'coverage'));


    gulp.task('lint', () => {
      return common.jslint(['./index.js', 'lib/**/*.js']);
    });

    gulp.task('css', () => {
      return common.sass(['spec/compile/test/*.s?ss'], [], {
        destDir: 'dist/',
        destFile: 'test.css'
      });
    });

    gulp.task('pug', () => {
      return common.pug('dist/', ['spec/compile/test/*.jade']);
    });

    gulp.task('test-compile', (done) => {
      return common.mocha(done, [], ['spec/compile/**/*.spec.js']);
    });

    gulp.task('test', gulp.series('test-server', 'test-client', 'test-compile'));

    // gulp.task('test', (done) => {
    //   return serial('test-server', 'test-client', 'test-compile', done);
    // });

    gulp.task('default', gulp.series('lint', 'css', 'pug'));
  }
}
module.exports = CommonRegistry;
