'use strict';

var assert = require('assert');
describe('Interval', function() {
  var Interval = require('../src/interval');
  describe('Should process valid objects', function() {
    var validIntervals = [
      {
        id: 0,
        range: {
          values: [1,2,3,4,5,6,7,8,9,10],
          unit: {
            min: 1,
            max: 10
          },
          toString: function() {
            return '*';
          }
        },
        step: 3,
        output: {
          str: '*/3',
          arr: [3,6,9]
        }
      },
      {
        id: 1,
        range: {
          values: [1,2,3,4,5,6,7,8],
          unit: {
            min: 1,
            max: 10
          },
          toString: function() {
            return '3,6';
          }
        },
        step: 3,
        output: {
          str: '3,6',
          arr: [3,6]
        }
      },
      {
        id: 2,
        range: {
          values: [1,2,3,4,5,6,7,8,9,10],
          unit: {
            min: 1,
            max: 12
          },
          toString: function() {
            return '3-9';
          }
        },
        step: 3,
        output: {
          str: '3-9/3',
          arr: [3,6,9]
        }
      },
      {
        id: 3,
        range: {
          values: [3,9],
          unit: {
            min: 1,
            max: 12
          },
          toString: function() {
            return '3,9';
          }
        },
        step: 3,
        output: {
          str: '3,9',
          arr: [3,9]
        }
      },
      {
        id: 4,
        range: {
          values: [1,2,3,4,5],
          unit: {
            min: 1,
            max: 12
          },
          toString: function() {
            return '3';
          }
        },
        step: 3,
        output: {
          str: '3',
          arr: [3]
        }
      },
      {
        id: 5,
        range: {
          values: [1,2,3,4,5,6,12],
          unit: {
            min: 1,
            max: 12
          },
          toString: function() {
            return '1-6,12';
          }
        },
        step: 3,
        output: {
          str: '1-6,12/3',
          arr: [3,6,12]
        }
      }
    ];
    validIntervals.forEach(function(validInterval) {
      it('Valid interval id ' + validInterval.id, function() {
        var interval = new Interval(
          validInterval.range,
          validInterval.step
        );
        assert.deepEqual(
            interval.toArray(),
            validInterval.output.arr
        );
        assert.equal(
            interval.toString(),
            validInterval.output.str
        );
      });
    });
  });
});
