'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var invalidCron = [
  undefined,
  null,
  NaN,
  '',
  '0',
  '0 0 0 0 0',
  '0 0 0 1 0',
  '0 0 1 0 0',
  '/ / / / /',
  '60 5 5 5 5',
  '/5 5 5 5 5',
  '10-5/5 5 5 5 5',
  '* * 0 * *',
  '* * * 0 *',
  '0/5/5 * * 0 *',
  '1-6/10 * * * *',
  '5/a * * * *',
  '5/ * * * *'
];

test('Should throw on invalid cron string', function(t) {
  t.plan(invalidCron.length);
  invalidCron.forEach(function(invalid) {
    var cron = new Cron();
    t.throws(
      function() {
        cron.fromString(invalid);
      },
      Error,
      invalid
    );
  });
});
