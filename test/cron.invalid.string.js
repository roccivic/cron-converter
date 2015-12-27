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
    error: 'Value out of range'
  },
  {
    string: '0 0 0 1 0',
    error: 'Value out of range'
  },
  {
    string: '0 0 1 0 0',
    error: 'Value out of range'
  },
  {
    string: '/ / / / /',
    error: 'Invalid value'
  },
  {
    string: '60 5 5 5 5',
    error: 'Value out of range'
  },
  {
    string: '/5 5 5 5 5',
    error: 'Invalid value'
  },
  {
    string: '10-5/5 5 5 5 5',
    error: 'Part syntax error: max range is less than min range'
  },
  {
    string: '* * 0 * *',
    error: 'Value out of range'
  },
  {
    string: '* * * 0 *',
    error: 'Value out of range'
  },
  {
    string: '0/5/5 * * 0 *',
    error: 'Interval syntax error'
  },
  {
    string: '1-6/10 * * * *',
    error: 'Empty interval value'
  },
  {
    string: '5/a * * * *',
    error: 'Invalid interval step value'
  },
  {
    string: '5/ * * * *',
    error: 'Invalid interval step value'
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
