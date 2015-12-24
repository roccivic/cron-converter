'use strict';

var assert = require('assert');
describe('Part', function() {
  var Part = require('../src/part');
  describe('Should throw on invalid strings', function() {
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
      it('Invalid range "' + invalidRange.input + '"', function() {
        assert.throws(
            function() {
              new Part(invalidRange).fromString(invalidRange.input);
            },
            Error
        );
      });
    });
  });
});
