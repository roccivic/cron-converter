'use strict';

var test = require('tape');
var Cron = require('../src/cron');

test('Should output weekdays as strings', function(t) {
  var cron = new Cron({
    outputWeekdayNames: true
  });
  t.plan(1);
  cron.fromString('* * * 1-3 1-5');
  t.equal(cron.toString(), '* * * 1-3 MON-FRI');
});
test('Should not output weekdays in step', function(t) {
  var cron = new Cron({
    outputWeekdayNames: true
  });
  cron.fromString('* * * 1-3 */2');
  t.plan(1);
  t.equal(cron.toString(), '* * * 1-3 */2');
});
test('Should output month names as strings', function(t) {
  var cron = new Cron({
    outputMonthNames: true
  });
  cron.fromString('* * * 1-3 1-5');
  t.plan(2);
  t.equal(cron.toString(), '* * * JAN-MAR 1-5');
  cron.fromString('* * * 5-10 1-5');
  t.equal(cron.toString(), '* * * MAY-OCT 1-5');
});
test('Should not output month names in step', function(t) {
  var cron = new Cron({
    outputMonthNames: true
  });
  cron.fromString('* * * */2 1-5');
  t.plan(1);
  t.equal(cron.toString(), '* * * */2 1-5');
});
