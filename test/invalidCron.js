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
      '/ / / / /',
      '60 5 5 5 5',
      '/5 5 5 5 5',
      '10-5/5 5 5 5 5'
    ];
    invalidCron.forEach(function(invalid) {
      it('Invalid string "' + invalid + '"', function() {
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
});
