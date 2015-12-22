'use strict';

var assert = require('assert');
describe('Range', function() {
  var Range = require('../src/range');
  describe('Should parse valid strings', function() {
    var validRanges = [
      {
        input: '0-4',
        arr: [0,1,2,3,4],
        output: '0-4',
        min: 0,
        max: 6
      },
      {
        input: 'SUN',
        arr: [0],
        output: '0',
        min: 0,
        max: 6,
        alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      },
      {
        input: 'SUN,MON,TUE',
        arr: [0,1,2],
        output: '0-2',
        min: 0,
        max: 6,
        alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      },
      {
        input: 'mon-fri',
        arr: [1,2,3,4,5],
        output: '1-5',
        min: 0,
        max: 6,
        alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
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
    validRanges.forEach(function(validRange) {
      it('Valid string: "' + validRange.input + '"', function() {
        var range = new Range(
          validRange.input,
          validRange
        );
        assert.deepEqual(
            range.toArray(),
            validRange.arr
        );
        assert.equal(
            range.toString(),
            validRange.output
        );
      });
    });
  });
});
