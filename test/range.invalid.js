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
  }
];
invalidRanges.forEach(function(invalidRange) {
  test(
    'Should throw on invalid range string "' + invalidRange.input + '"',
    function(t) {
      t.plan(1);
      t.throws(
          function() {
            new Part(invalidRange).fromString(invalidRange.input);
          },
          Error
      );
    }
  );
});
