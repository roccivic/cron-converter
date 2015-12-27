'use strict';

var test = require('tape');
var Cron = require('../src/cron');

test('Should output hashes', function(t) {
  t.plan(2);
  var cron = new Cron({
    outputHashes: true
  });
  cron.fromString('* * * 1-3 1-5');
  t.equal(
    cron.toString(),
    'H H H 1-3 1-5',
    'for full ranges'
  );
  cron.fromString('*/5 1-20/5 3,6,9/3 1-3 1-5');
  t.equal(
    cron.toString(),
    'H/5 H(5-20)/5 H(3-9)/3 1-3 1-5',
    'for full intervals and range intervals'
  );
});

test('Should output hashes for readme', function(t) {
  t.plan(1);
  var cron = new Cron({
    outputHashes: true,
    outputMonthNames: true,
    outputWeekdayNames: true
  });
  cron.fromString('*/5 9-17/2 * 1-3 1-5');
  t.equal(
    cron.toString(),
    'H/5 H(10-16)/2 H JAN-MAR MON-FRI'
  );
});
