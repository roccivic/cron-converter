'use strict';

var assert = require('assert');
var moment = require('moment');
describe('Seeker', function() {
  var Cron = require('../src/cron');
  var schedules = [
    '* * 30 FEB *'
  ];
  schedules.forEach(function(schedule) {
    it('Should throw on invalid schedule ' + schedule, function() {
      var cron = new Cron();
      cron.parse(schedule);
      assert.throws(
        function() {
          cron.next();
        },
        Error
      );
    });
  });
});
