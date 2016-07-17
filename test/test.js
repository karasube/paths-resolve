const pathsResolve = require('..');
const expect = require('chai').expect;

describe('pathsResolve()', function() {
  it('should returns all js files in dummy directory & sub directories, with absolute paths, as an array', function() {
    let dummyDirectory = __dirname + '/dummy';
    let files = pathsResolve(dummyDirectory, [], ['.js']);

    let expectedResults = [
      dummyDirectory + '/dummyFile.js',
      dummyDirectory + '/subdummy/subDummyFile.js'
    ];

    expect(files).to.be.a('array');
    expect(files).to.deep.equal(expectedResults);
  });
});
