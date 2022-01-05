const jsAngular =  require('./base/jsangular');

const task = () => {
    return jsAngular('ncc1701.js', 'dist/public/scripts/', ['src/admin/scripts/**/*.js'])
}

module.exports = task;
