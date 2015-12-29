'use strict';

var test = require('tape');
var Cron = require('../src/cron');

test('Should throw when uninstanciated', function(t) {
  var cron = new Cron();
  t.plan(3);
  try {
    cron.toString();
    t.fail('Missing expected exception');
  } catch (e) {
    t.equal(
      e.message,
      'No schedule found',
      'on toString'
    );
  }
  try {
    cron.toArray();
    t.fail('Missing expected exception');
  } catch (e) {
    t.equal(
      e.message,
      'No schedule found',
      'on toArray'
    );
  }
  try {
    cron.schedule();
    t.fail('Missing expected exception');
  } catch (e) {
    t.equal(
      e.message,
      'No schedule found',
      'on schedule'
    );
  }
});
test('Result of toArray should not affect object', function(t) {
  var cron = new Cron();
  t.plan(3);
  cron.fromString('1-10/5 1 1 1 1');
  var arr = cron.toArray();
  t.deepEqual(
      arr,
      [[5,10],[1],[1],[1],[1]]
  );
  arr[0] = [5];
  t.deepEqual(
      cron.toArray(),
      [[5,10],[1],[1],[1],[1]]
  );
  t.equal(
      cron.toString(),
      '5,10 1 1 1 1'
  );
});
