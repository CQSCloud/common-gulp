const { registry } = require('gulp');
const CommonRegistry = require('./registry');

registry(new CommonRegistry());
