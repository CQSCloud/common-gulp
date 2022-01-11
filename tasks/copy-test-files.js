const copy =  require('./base/copy');
const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

const projectTypescript = src('src/server/scripts/**/*.ts', {
  base: '.'
}, {
  allowEmpty: true
})
  .pipe(tsProject())
  .js
  .pipe(dest('test'));

const task = (cb) => {
  projectTypescript();
  copy('test/src/shared', 'src/shared/**/*.*');
  copy('test/src/cwIntegration', 'src/cwIntegration/**/*.*');
  copy('test/src/database', 'src/database/**/*.*');
  copy('test/src/server', 'src/server/**/*.*');
  cb();
};

task.displayName = 'copy-test-files';
task.description = 'Copy test files to test folder';

module.exports = task;
