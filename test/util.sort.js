'use strict';

var test = require('tape');
var util = require('../src/util');

var arrays = [
  {
    input: [],
    sorted: []
  },
  {
    input: [0, 1],
    sorted: [0, 1]
  },
  {
    input: [1, 0],
    sorted: [0, 1]
  },
  {
    input: [1, 0, 1],
    sorted: [0, 1, 1]
  },
  {
    input: [5,4,3,2,1],
    sorted: [1,2,3,4,5]
  },
  {
    input: [42, 9, 17, 54, 602, -3, 54, 999, -11],
    sorted: [-11, -3, 9, 17, 42, 54, 54, 602, 999]
  }
];
test('Should sort arrays', function(t) {
  t.plan(arrays.length);
  arrays.forEach(function(array) {
    var sorted = util.sort(array.input);
    t.deepEqual(
      sorted,
      array.sorted,
      'Sorted ' + array.input.join(' ')
    );
  });
});
