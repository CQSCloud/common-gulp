const copy =  require('./base/copy');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

const task = () =>
  gulp.series(
    gulp.src('src/server/scripts/**/*.ts', {
      base: '.'
    }, {
      allowEmpty: true
    })
      .pipe(tsProject())
      .js
      .pipe(gulp.dest('test')),
    copy('test/src/shared', 'src/shared/**/*.*'),
    copy('test/src/cwIntegration', 'src/cwIntegration/**/*.*'),
    copy('test/src/database', 'src/database/**/*.*'),
    copy('test/src/server', 'src/server/**/*.*')
  );

module.exports = task;
