const expect = require('chai').expect;
const fs = require('fs');

describe('pug output', function() {
  const HTML_EXPECTED = '<!DOCTYPE html><html lang="en"><head><title>test</title></head><body><h1>test</h1></body></html>'; // eslint-disable-line

  it('compiles html', function() {
    expect(fs.readFileSync('dist/test.html').toString()).to.equal(HTML_EXPECTED);
  });
});
