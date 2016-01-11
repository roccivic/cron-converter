'use strict';

var test = require('tape');
var Cron = require('../src/cron');

var invalidCron = [
  {
    array: [],
    error: 'Invalid cron array'
  },
  {
    array: [[], [], [], [], []],
    error: 'Empty interval value for minute'
  },
  {
    array: [['a'], [1], [1], [1], [1]],
    error: 'Invalid value "a" for minute'
  },
  {
    array: [[0], [0], [0], [0], [0]],
    error: 'Value "0" out of range for day'
  }
];

test('Should throw on invalid cron array', function(t) {
  t.plan(invalidCron.length);
  invalidCron.forEach(function(invalid) {
    var cron = new Cron();
    try {
      cron.fromArray(invalid.array);
      t.fail('Missing expected exception');
    } catch (e) {
      t.equal(
        e.message,
        invalid.error,
        invalid.array.join(' ')
      );
    }
  });
});
