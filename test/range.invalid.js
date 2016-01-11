'use strict';

var test = require('tape');
var Part = require('../src/part');

var invalidRanges = [
  {
    input: '',
    min: 1,
    max: 10,
    error: 'Invalid value "" for sample unit',
    name: 'sample unit'
  },
  {
    input: '3-1',
    min: 1,
    max: 2,
    error: 'Max range is less than min range in "3-1" for sample unit',
    name: 'sample unit'
  },
  {
    input: '1-2-3',
    min: 1,
    max: 10,
    error: 'Invalid value "1-2-3" for sample unit',
    name: 'sample unit'
  },
  {
    input: '5-15',
    min: 10,
    max: 20,
    error: 'Value "5" out of range for sample unit',
    name: 'sample unit'
  },
  {
    input: '**',
    min: 1,
    max: 10,
    error: 'Invalid value "**" for sample unit',
    name: 'sample unit'
  },
  {
    input: '0-',
    min: 0,
    max: 10,
    error: 'Empty interval value "0-" for sample unit',
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
