'use strict';

var test = require('tape');

var Cron = require('../src/cron');

var schedules = [
  '* * 30 FEB *'
];
test('Should throw on invalid schedule', function(t) {
  t.plan(schedules.length);
  schedules.forEach(function(schedule) {
    var cron = new Cron();
    cron.fromString(schedule);
    t.throws(
      function() {
        cron.next();
      },
      Error,
      schedule
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
