const expect = require('chai').expect;
const fs = require('fs');

describe('sass output', function() {
  const CSS_EXPECTED = 'body {\n  background: white;\n  color: red;\n}\nmeta.foundation-version {\n  font-family: "/5.4.7/";\n}'; // eslint-disable-line

  it('compiles css', function() {
    expect(fs.readFileSync('dist/test.css').toString()).to.equal(CSS_EXPECTED);
  });
});
