'use strict';

var test = require('tape');

var Cron = require('../src/cron');

var schedules = [
  '* * 30 FEB *'
];
schedules.forEach(function(schedule) {
  test('Should throw on invalid schedule ' + schedule, function(t) {
    var cron = new Cron();
    t.plan(1);
    cron.fromString(schedule);
    t.throws(
      function() {
        cron.next();
      },
      Error
    );
  });
});

test('Should throw on invalid date', function(t) {
  var cron = new Cron();
  t.plan(1);
  cron.fromString('* * * * *');
  t.throws(
    function() {
      cron.next(NaN);
    },
    Error
  );
});
