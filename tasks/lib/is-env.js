const isTest = () => {
  return process.env.NODE_ENV === 'test';
};

const isProduction = () => {
  return isTest() || process.env.NODE_ENV === 'production';
};

exports.isTest = isTest;
exports.isProduction = isProduction;
