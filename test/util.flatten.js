'use strict';

var test = require('tape');
var util = require('../src/util');

var arrays = [
  {
    input: [],
    flattened: []
  },
  {
    input: [[1],[2]],
    flattened: [1,2]
  },
  {
    input: [[1,5],[2,6]],
    flattened: [1,5,2,6]
  }
];
test('Should flatten arrays', function(t) {
  t.plan(arrays.length);
  arrays.forEach(function(array) {
    var flattened = util.flatten(array.input);
    t.deepEqual(
      flattened,
      array.flattened,
      'Flattened ' + array.input.join(' ')
    );
  });
});
