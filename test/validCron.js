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
        in: ' 0  0   1    JAN     SUN ',
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
      },
      {
        in: '*/5 0-5/10 1-31 JAN-DEC SUN-SAT',
        out: '*/5 0 * * *'
      },
      {
        in: '*/5 0,5 1-31 JAN-DEC SUN-SAT',
        out: '*/5 0,5 * * *'
      }
    ];
    validCron.forEach(function(valid) {
      it('Valid string "' + valid.in + '"', function() {
        var cron = new Cron();
        cron.fromString(valid.in);
        assert.equal(
            cron.toString(),
            valid.out
        );
      });
    });
  });
  describe('Should parse valid cron array', function() {
    var validCron = [
      {
        in: [[0], [0], [1], [1], [0]],
        out: '0 0 1 1 0'
      },
      {
        in: [[1,2,3], [1], [2,3,4], [5], [0,1,2,3,4,5,6]],
        out: '1-3 1 2-4 5 *'
      },
      {
        in: [[0], [1], [1], [5], [0,2,4,6]],
        out: '0 1 1 5 */2'
      }
    ];
    validCron.forEach(function(valid) {
      it('Valid array "' + valid.in.join(' ') + '"', function() {
        var cron = new Cron();
        cron.fromArray(valid.in);
        assert.equal(
            cron.toString(),
            valid.out
        );
      });
    });
  });
});
