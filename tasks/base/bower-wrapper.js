'use strict';

const { dest } = require('gulp');
const bower = require('gulp-bower');

const wrapper = (destination) => {
  const to = destination || 'bower';
  return bower({ directory: to })
    .pipe(dest(to));
};

module.exports = wrapper;
