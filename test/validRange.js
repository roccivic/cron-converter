'use strict';

var assert = require('assert');
describe('validRange', function() {
  var Range = require('../src/range');
  var validRanges = [
    {
      input: '0-4',
      arr: [0,1,2,3,4],
      output: '0-4',
      min: 0,
      max: 6
    },
    {
      input: '1-20/5',
      arr: [5,10,15,20],
      output: '*/5',
      min: 1,
      max: 24
    },
    {
      input: '0-20/5',
      arr: [0,5,10,15,20],
      output: '*/5',
      min: 0,
      max: 20
    },
    {
      input: '5-20/5',
      arr: [5,10,15,20],
      output: '5-20/5',
      min: 0,
      max: 100
    },
    {
      input: '*/3',
      arr: [0,3,6,9],
      output: '*/3',
      min: 0,
      max: 9
    },
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
        validRange
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
