'use strict';

var test = require('tape');

var Cron = require('../src/cron');

var schedules = [
  {
    string: '* * 30 FEB *',
    error: 'Unable to find execution time for schedule'
  }
];
test('Should throw on invalid schedule', function(t) {
  t.plan(schedules.length);
  schedules.forEach(function(schedule) {
    var cron = new Cron();
    cron.fromString(schedule.string);
    try {
      cron.schedule().next();
      t.fail('Missing expected exception');
    } catch (e) {
      t.equal(
        e.message,
        schedule.error,
        schedule.string
      );
    }
  });
});

test('Should throw on invalid date', function(t) {
  var cron = new Cron();
  t.plan(1);
  cron.fromString('* * * * *');
  try {
    cron.schedule(NaN);
    t.fail('Missing expected exception');
  } catch (e) {
    t.equal(
      e.message,
      'Invalid date provided',
      'NaN'
    );
  }
});
