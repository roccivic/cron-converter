'use strict';

var test = require('tape');
var Part = require('../src/part');

var invalidRanges = [
  {
    input: '',
    min: 1,
    max: 10,
    error: 'Invalid value'
  },
  {
    input: '3-1',
    min: 1,
    max: 2,
    error: 'Part syntax error: max range is less than min range'
  },
  {
    input: '1-2-3',
    min: 1,
    max: 10,
    error: 'Part syntax error'
  },
  {
    input: '5-15',
    min: 10,
    max: 20,
    error: 'Value out of range'
  },
  {
    input: '**',
    min: 1,
    max: 10,
    error: 'Invalid value'
  },
  {
    input: '0-',
    min: 0,
    max: 10,
    error: 'Empty interval value'
  }
];
test('Should throw on invalid range string', function(t) {
  t.plan(invalidRanges.length);
  invalidRanges.forEach(function(invalidRange) {
    try {
      new Part(invalidRange).fromString(invalidRange.input);
      t.fail('Missing expected exception');
    } catch (e) {
      t.equal(
        e.message,
        invalidRange.error,
        invalidRange.input
      );
    }
  });
});
