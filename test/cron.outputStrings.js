'use strict';

var test = require('tape');
var Cron = require('../src/cron');

test('Should output weekdays as strings', function(t) {
  var cron = new Cron({
    outputWeekdayNames: true
  });
  cron.fromString('* * * 1-3 1-5');
  t.plan(1);
  t.equal(cron.toString(), '* * * 1-3 MON-FRI');
});
test('Should output weekdays as strings', function(t) {
  var cron = new Cron({
    outputMonthNames: true
  });
  cron.fromString('* * * 1-3 1-5');
  t.plan(1);
  t.equal(cron.toString(), '* * * JAN-MAR 1-5');
});
