'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var invalidCron = [
  {
    string: undefined,
    error: 'Invalid cron string'
  },
  {
    string: null,
    error: 'Invalid cron string'
  },
  {
    string: NaN,
    error: 'Invalid cron string'
  },
  {
    string: '',
    error: 'Invalid cron string format'
  },
  {
    string: '0',
    error: 'Invalid cron string format'
  },
  {
    string: '0 0 0 0 0',
    error: 'Value "0" out of range for day'
  },
  {
    string: '0 0 0 1 0',
    error: 'Value "0" out of range for day'
  },
  {
    string: '0 0 1 0 0',
    error: 'Value "0" out of range for month'
  },
  {
    string: '/ / / / /',
    error: 'Invalid value "/" for minute'
  },
  {
    string: '60 5 5 5 5',
    error: 'Value "60" out of range for minute'
  },
  {
    string: '/5 5 5 5 5',
    error: 'Invalid value "/5" for minute'
  },
  {
    string: '10-5/5 5 5 5 5',
    error: 'Max range is less than min range in "10-5" for minute'
  },
  {
    string: '* * 0 * *',
    error: 'Value "0" out of range for day'
  },
  {
    string: '* * * 0 *',
    error: 'Value "0" out of range for month'
  },
  {
    string: '0/5/5 * * 0 *',
    error: 'Invalid value "0/5/5" for minute'
  },
  {
    string: '1-6/10 * * * *',
    error: 'Empty interval value "1-6/10" for minute'
  },
  {
    string: '5/a * * * *',
    error: 'Invalid interval step value "a" for minute'
  },
  {
    string: '5/ * * * *',
    error: 'Invalid interval step value "" for minute'
  }
];

test('Should throw on invalid cron string', function(t) {
  t.plan(invalidCron.length);
  invalidCron.forEach(function(invalid) {
    var cron = new Cron();
    try {
      cron.fromString(invalid.string);
      t.fail('Missing expected exception');
    } catch (e) {
      t.equal(
        e.message,
        invalid.error,
        invalid.string
      );
    }
  });
});
