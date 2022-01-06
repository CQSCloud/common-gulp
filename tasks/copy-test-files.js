const copy =  require('./base/copy');
const gulp = require('gulp');

const task = () => {
    gulp.src('src/server/scripts/**/*.ts', {
        base: '.'
    }, {
        allowEmpty: true
    })
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('test'));

    return new Promise(resolver => {
        copy('test/src/shared', 'src/shared/**/*.*')
            .on('finish', () => {
                copy('test/src/cwIntegration', 'src/cwIntegration/**/*.*')
                    .on('finish', () => {
                        copy('test/src/database', 'src/database/**/*.*')
                            .on('finish', () => {
                                copy('test/src/server', 'src/server/**/*.*')
                                    .on('finish', () => {
                                        resolver();
                                    });
                            });
                    });
            });
    });
}

module.exports = task;
