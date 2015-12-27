'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var validCron = [
  {
    in: [[0], [0], [1], [1], [0]],
    out: '0 0 1 1 0'
  },
  {
    in: [[1,2,3], [1], [2,3,4], [5], [0,1,2,3,4,5,6]],
    out: '1-3 1 2-4 5 *'
  },
  {
    in: [[0], [1], [1], [5], [0,2,4,6]],
    out: '0 1 1 5 */2'
  }
];

test('Should parse valid cron array', function(t) {
  t.plan(validCron.length);
  validCron.forEach(function(valid) {
    var cron = new Cron();
    cron.fromArray(valid.in);
    t.equal(
      cron.toString(),
      valid.out,
      valid.in.join(' ')
    );
  });
});
