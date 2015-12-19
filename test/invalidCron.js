'use strict';

var assert = require('assert');
describe('invalidCron', function() {
  var Cron = require('../src/cron');
  it('should throw when uninstanciated', function() {
    var cron = new Cron();
    assert.throws(function() {
      cron.toString();
    }, Error);
    assert.throws(function() {
      cron.toArray();
    }, Error);
  });
  it('should throw on invalid cron strings', function() {
    var invalidCron = [
      undefined,
      null,
      NaN,
      '',
      ''
    ];
    invalidCron.forEach(function(invalid) {
      var cron = new Cron();
      assert.throws(
          function() {
            cron.parse(invalid);
          },
          Error
      );
    });
  });
});
