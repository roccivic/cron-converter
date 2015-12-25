'use strict';

var test = require('tape');
var Cron = require('../src/cron');

test('Should throw when uninstanciated', function(t) {
  var cron = new Cron();
  t.plan(4);
  t.throws(function() {
    cron.toString();
  }, Error);
  t.throws(function() {
    cron.toArray();
  }, Error);
  t.throws(function() {
    cron.next();
  }, Error);
  t.throws(function() {
    cron.prev();
  }, Error);
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
