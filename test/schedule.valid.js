'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var schedules = [
  {
    schedule: '*/5 * * * *',
    prev: '2013-02-08T09:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
    next: '2013-02-08T09:35:00.000Z'
  },
  {
    schedule: '30 1 * * *',
    prev: '2013-02-08T01:30:00.000Z',
    now: '2013-02-08T09:32:00.000Z',
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
schedules.forEach(function(s) {
  test('Should output next schedule time for ' + s.schedule, function(t) {
    var cron = new Cron();
    t.plan(1);
    cron.fromString(s.schedule);
    t.equal(
      cron.next(s.now).toJSON(),
      s.next
    );
  });
  test('Should output last schedule time for ' + s.schedule, function(t) {
    var cron = new Cron();
    t.plan(1);
    cron.fromString(s.schedule);
    t.equal(
      cron.prev(s.now).toJSON(),
      s.prev
    );
  });
});
