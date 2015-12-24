'use strict';

var assert = require('assert');
describe('Cron', function() {
  var Cron = require('../src/cron');
  describe('Should throw on invalid cron strings', function() {
    var invalidCron = [
      undefined,
      null,
      NaN,
      '',
      '0',
      '0 0 0 0 0',
      '0 0 0 1 0',
      '0 0 1 0 0',
      '/ / / / /',
      '60 5 5 5 5',
      '/5 5 5 5 5',
      '10-5/5 5 5 5 5',
      '* * 0 * *',
      '* * * 0 *',
      '0/5/5 * * 0 *',
      '1-6/10 * * * *',
      '5/a * * * *',
      '5/ * * * *'
    ];
    invalidCron.forEach(function(invalid) {
      it('Invalid string "' + invalid + '"', function() {
        var cron = new Cron();
        assert.throws(
            function() {
              cron.fromString(invalid);
            },
            Error
        );
      });
    });
  });
  describe('Should throw on invalid cron array', function() {
    var invalidCron = [
      [],
      [[], [], [], [], []],
      [['a'], [1], [1], [1], [1]],
      [[0], [0], [0], [0], [0]],
    ];
    invalidCron.forEach(function(invalid) {
      it('Invalid array "' + invalid.join(' ') + '"', function() {
        var cron = new Cron();
        assert.throws(
            function() {
              cron.fromArray(invalid);
            },
            Error
        );
      });
    });
  });
});
