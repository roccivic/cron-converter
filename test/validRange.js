var assert = require('assert');
describe('validRange', function() {
  var Range = require('../src/range');
  var validRanges = [
    {
      input: '1,2,3',
      arr: [1,2,3],
      output: '1-3',
      min: 1,
      max: 10
    },
    {
      input: '1,3,2',
      arr: [1,2,3],
      output: '*',
      min: 1,
      max: 3
    },
    {
      input: '1,2,5-10',
      arr: [1,2,5,6,7,8,9,10],
      output: '1-2,5-10',
      min: 1,
      max: 30
    },
    {
      input: '*',
      arr: [1,2,3,4,5],
      output: '*',
      min: 1,
      max: 5
    },
    {
      input: '5',
      arr: [5],
      output: '5',
      min: 1,
      max: 5
    }
  ];
  it('should parse valid strings', function() {
    for (var i in validRanges) {
      var validRange = validRanges[i];
      var range = new Range(
        validRange.input,
        validRange.min,
        validRange.max
      );
      assert.deepEqual(
          range.values,
          validRange.arr
      );
      assert.equal(
          range.toString(),
          validRange.output
      );
    }
  });
});
