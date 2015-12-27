'use strict';

var test = require('tape');
var Part = require('../src/part');

var invalidRanges = [
  {
    input: '',
    min: 1,
    max: 10
  },
  {
    input: '3-1',
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
    input: '**',
    min: 1,
    max: 10
  },
  {
    input: '0-',
    min: 0,
    max: 10
  }
];
test('Should throw on invalid range string', function(t) {
  t.plan(invalidRanges.length);
  invalidRanges.forEach(function(invalidRange) {
    t.throws(
      function() {
        new Part(invalidRange).fromString(invalidRange.input);
      },
      Error,
      invalidRange.input
    );
  });
});
