'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var validCron = [
  {
    in: '0 0 1 JAN SUN',
    out: '0 0 1 1 0'
  },
  {
    in: ' 0  0   1    JAN     SUN ',
    out: '0 0 1 1 0'
  },
  {
    in: '0 0 1 1 0',
    out: '0 0 1 1 0'
  },
  {
    in: '59 23 31 12 6',
    out: '59 23 31 12 6'
  },
  {
    in: '59 23 31 DEC SAT',
    out: '59 23 31 12 6'
  },
  {
    in: '0-59 0-23 1-31 1-12 0-6',
    out: '* * * * *'
  },
  {
    in: '0-59 0-23 1-31 1-12 1-7',
    out: '* * * * *'
  },
  {
    in: '0-59 0-23 1-31 1-12 5-7',
    out: '* * * * 0,5-6'
  },
  {
    in: '0-59 0-23 1-31 JAN-DEC SUN-SAT',
    out: '* * * * *'
  },
  {
    in: '*/5 0-5/10 1-31 JAN-DEC SUN-SAT',
    out: '*/5 0 * * *'
  },
  {
    in: '*/5 0,5 1-31 JAN-DEC SUN-SAT',
    out: '*/5 0,5 * * *'
  }
];

test('Should parse valid cron string', function(t) {
  t.plan(validCron.length);
  validCron.forEach(function(valid) {
    var cron = new Cron();
    cron.fromString(valid.in);
    t.equal(
      cron.toString(),
      valid.out,
      valid.in
    );
  });
});
