'use strict';

var assert = require('assert');
describe('Cron', function() {
  var Cron = require('../src/cron');
  it('Should throw when uninstanciated', function() {
    var cron = new Cron();
    assert.throws(function() {
      cron.toString();
    }, Error);
    assert.throws(function() {
      cron.toArray();
    }, Error);
  });
  it('Result of toArray should not affect object', function() {
    var cron = new Cron();
    cron.parse('1-10/5 1 1 1 1');
    var arr = cron.toArray();
    assert.deepEqual(
        arr,
        [[5,10],[1],[1],[1],[1]]
    );
    arr[0] = [5];
    assert.deepEqual(
        cron.toArray(),
        [[5,10],[1],[1],[1],[1]]
    );
    assert.equal(
        cron.toString(),
        '5,10 1 1 1 1'
    );
  });
});
