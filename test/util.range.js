'use strict';

var test = require('tape');
var util = require('../src/util');

var ranges = [
  {
    start: 0,
    end: 0,
    output: [0]
  }
];
test('Should create range arrays', function(t) {
  t.plan(ranges.length);
  ranges.forEach(function(r) {
    t.deepEqual(
      util.range(r.start, r.end),
      r.output,
      'Create range from ' + r.start + ' to ' + r.end
    );
  });
});
