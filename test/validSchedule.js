'use strict';

var assert = require('assert');
describe('Seeker', function() {
  var Cron = require('../src/cron');
  it('Should throw on invalid date', function() {
    var cron = new Cron();
    cron.parse('* * * * *');
    assert.throws(
      function() {
        cron.next(NaN);
      },
      Error
    );
  });
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
    }
  ];
  schedules.forEach(function(schedule) {
    it('Should output next schedule time for ' + schedule.schedule, function() {
      var cron = new Cron();
      cron.parse(schedule.schedule);
      assert.equal(
        cron.next(schedule.now).toJSON(),
        schedule.next
      );
    });
    it('Should output last schedule time for ' + schedule.schedule, function() {
      var cron = new Cron();
      cron.parse(schedule.schedule);
      assert.equal(
        cron.prev(schedule.now).toJSON(),
        schedule.prev
      );
    });
  });
});
