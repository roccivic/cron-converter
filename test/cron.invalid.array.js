'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var invalidCron = [
  [],
  [[], [], [], [], []],
  [['a'], [1], [1], [1], [1]],
  [[0], [0], [0], [0], [0]],
];

invalidCron.forEach(function(invalid) {
  test('Should throw on invalid cron array "' + invalid + '"', function(t) {
    var cron = new Cron();
    t.plan(1);
    t.throws(
      function() {
        cron.fromArray(invalid);
      },
      Error
    );
  });
});
