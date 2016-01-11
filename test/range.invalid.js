'use strict';

var test = require('tape');
var Part = require('../src/part');

var invalidRanges = [
  {
    input: '',
    min: 1,
    max: 10,
    error: 'Invalid value for sample unit',
    name: 'sample unit'
  },
  {
    input: '3-1',
    min: 1,
    max: 2,
    error: 'Part syntax error: max range is less than min range for sample unit',
    name: 'sample unit'
  },
  {
    input: '1-2-3',
    min: 1,
    max: 10,
    error: 'Part syntax error for sample unit',
    name: 'sample unit'
  },
  {
    input: '5-15',
    min: 10,
    max: 20,
    error: 'Value out of range for sample unit',
    name: 'sample unit'
  },
  {
    input: '**',
    min: 1,
    max: 10,
    error: 'Invalid value for sample unit',
    name: 'sample unit'
  },
  {
    input: '0-',
    min: 0,
    max: 10,
    error: 'Empty interval value for sample unit',
    name: 'sample unit'
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
