'use strict';

var assert = require('assert');
describe('Cron', function() {
  var Cron = require('../src/cron');
  describe('Should parse valid cron strings', function() {
    var validCron = [
      {
        in: '0 0 1 JAN SUN',
        out: '0 0 1 1 0'
      },
      {
        in: '0 0 1 1 0',
        out: '0 0 1 1 0'
      },
      {
        in: '59 23 31 12 6',
        out: '59 23 31 12 6'
      },
      {
        in: '59 23 31 DEC SAT',
        out: '59 23 31 12 6'
      },
      {
        in: '0-59 0-23 1-31 1-12 0-6',
        out: '* * * * *'
      },
      {
        in: '0-59 0-23 1-31 JAN-DEC SUN-SAT',
        out: '* * * * *'
      }
    ];
    validCron.forEach(function(valid) {
      it('Valid string "' + valid.in + '"', function() {
        var cron = new Cron();
        assert.equal(
            cron.parse(valid.in),
            valid.out
        );
      });
    });
  });
});
