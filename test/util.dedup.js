'use strict';

var test = require('tape');
var util = require('../src/util');

var arrays = [
  {
    input: [],
    output: []
  },
  {
    input: [0,0,0],
    output: [0]
  },
  {
    input: [1,1,1,2,3,4,5,6],
    output: [1,2,3,4,5,6]
  },
  {
    input: [500,-1,33,-1,0,0,1,1,-1],
    output: [500,-1,33,0,1]
  }
];
test('Should de-dup arrays', function(t) {
  t.plan(arrays.length);
  arrays.forEach(function(array) {
    var output = util.dedup(array.input);
    t.deepEqual(
      output,
      array.output,
      'De-duped ' + array.input.join(' ')
    );
  });
});
