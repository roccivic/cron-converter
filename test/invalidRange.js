var assert = require('assert');
describe('invalidRange', function() {
  var Range = require('../src/range');
  var invalidRanges = [
    {
      input: '3-1',
      min: 1,
      max: 2
    },
    {
      input: '*/',
      min: 1,
      max: 2
    },
    {
      input: '*/5/5',
      min: 1,
      max: 2
    },
    {
      input: '*/a',
      min: 1,
      max: 2
    },
    {
      input: '1-2-3',
      min: 1,
      max: 10
    },
    {
      input: '5-15',
      min: 10,
      max: 20
    },
    {
      input: '',
      min: 1,
      max: 10
    }
  ];
  it('should throw on invalid strings', function() {
    invalidRanges.forEach(function(invalidRange) {
      assert.throws(
          function() {
            new Range(
              invalidRange.input,
              invalidRange.min,
              invalidRange.max
            );
          },
          Error
      );
    });
  });
});
