'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var invalidCron = [
  [],
  [[], [], [], [], []],
  [['a'], [1], [1], [1], [1]],
  [[0], [0], [0], [0], [0]],
];

test('Should throw on invalid cron array', function(t) {
  t.plan(invalidCron.length);
  invalidCron.forEach(function(invalid) {
    var cron = new Cron();
    t.throws(
      function() {
        cron.fromArray(invalid);
      },
      Error,
      invalid
    );
  });
});
