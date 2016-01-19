'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var schedules = [
  {
    schedule: '* * * * *',
    prev: '2013-02-08T09:31:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2013-02-08T09:32:00.000Z'
  },
  {
    schedule: '* * * * *',
    prev: '2013-02-08T09:32:00.000Z',
    now: '2013-02-08T09:32:15.000Z',
    next: '2013-02-08T09:33:00.000Z'
  },
  {
    schedule: '*/5 * * * *',
    prev: '2013-02-08T09:30:00.000Z',
    now: '2013-02-08T09:32:15.000Z',
    next: '2013-02-08T09:35:00.000Z'
  },
  {
    schedule: '30 1 * * *',
    prev: '2013-02-08T01:30:00.000Z',
    now: '2013-02-08T09:32:15.000Z',
    next: '2013-02-09T01:30:00.000Z'
  },
  {
    schedule: '30 1 1 * *',
    prev: '2013-02-01T01:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2013-03-01T01:30:00.000Z'
  },
  {
    schedule: '30 1 * 1 *',
    prev: '2013-01-31T01:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2014-01-01T01:30:00.000Z'
  },
  {
    schedule: '30 1 1 1 *',
    prev: '2013-01-01T01:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2014-01-01T01:30:00.000Z'
  },
  {
    schedule: '30 1 * * SAT',
    prev: '2013-02-02T01:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2013-02-09T01:30:00.000Z'
  },
  {
    schedule: '30 1 * * MON-FRI',
    prev: '2013-02-08T01:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2013-02-11T01:30:00.000Z'
  },
  {
    schedule: '1-30/10 * * * MON-FRI',
    prev: '2013-02-08T09:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2013-02-08T10:10:00.000Z'
  },
  {
    schedule: '* * * * MON-FRI',
    prev: '2013-02-07T23:59:00.000Z',
    now: '2013-02-08T00:00:00.000Z',
    next: '2013-02-08T00:00:00.000Z'
  },
  {
    schedule: '*/10 * * * MON-FRI',
    prev: '2013-02-08T09:20:00.000Z',
    now: '2013-02-08T09:30:00.000Z',
    next: '2013-02-08T09:30:00.000Z'
  }
];
test('Should output execution time for valid schedule', function(t) {
  t.plan(schedules.length * 2);
  schedules.forEach(function(s) {
    var cron = new Cron({
      timezone: 'Europe/London'
    });
    cron.fromString(s.schedule);
    var schedule = cron.schedule(s.now);
    t.equal(
      schedule.next().toJSON(),
      s.next,
      'Next for ' + s.schedule
    );
    schedule.reset();
    t.equal(
      schedule.prev().toJSON(),
      s.prev,
      'Prev for ' + s.schedule
    );
  });
});

test('Should output execution time for valid schedule twice', function(t) {
  t.plan(2);
  var cron = new Cron();
  cron.fromString('*/5 * * * *');
  var schedule = cron.schedule('2013-02-08T09:32:15.000Z');
  t.equal(
    schedule.next().toJSON(),
    '2013-02-08T09:35:00.000Z',
    'Next first time'
  );
  t.equal(
    schedule.next().toJSON(),
    '2013-02-08T09:40:00.000Z',
    'Next second time'
  );
});
