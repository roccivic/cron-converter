'use strict';

var moment = require('moment');

/**
 * Creates an instance of Seeker.
 * Seeker objects search for execution times of a cron schedule.
 *
 * @constructor
 * @this {Seeker}
 */
function Seeker() {
}

var shiftMonth = function(parts, date, operation, reset) {
  // Check month
  while (!parts[3].has(date.month() + 1)) {
    // date.add(1, 'months').startOf('month')
    // date.subtract(1, 'months').endOf('month')
    date[operation](1, 'months')[reset]('month');
  }
};

var shiftDay = function(parts, date, operation, reset) {
  // Check day of month and weekday
  var currentMonth = date.month();
  while (!parts[2].has(date.date()) || !parts[4].has(date.day())) {
    date[operation](1, 'days')[reset]('day');
    if (currentMonth !== date.month()) {
      return true;
    }
  }
  return false;
};

var shiftHour = function (parts, date, operation, reset) {
  var currentDay = date.date();
  // Check hour
  while (!parts[1].has(date.hour())) {
    date[operation](1, 'hours')[reset]('hour');
    if (currentDay !== date.date()) {
      return true;
    }
  }
  return false;
};

var shiftMinute = function (parts, date, operation, reset) {
  var currentHour = date.hour();
  // Check minute
  while (!parts[0].has(date.minute())) {
    date[operation](1, 'minutes')[reset]('minute');
    if (currentHour !== date.hour()) {
      return true;
    }
  }
  return false;
};

/**
 * Returns the time the schedule would run next.
 *
 * @this {Seeker}
 * @param {Date} now A Date object
 * @return {Date} The time the schedule would run next.
 */
Seeker.prototype.next = function(parts, now, reverse) {
  var date = moment(now);
  if (!date.isValid()) {
    throw new Error('Invalid date provided');
  }
  var operation = 'add';
  var reset = 'startOf';
  if (reverse) {
    operation = 'subtract';
    reset = 'endOf';
  }
  while (true) {
    shiftMonth(parts, date, operation, reset);
    var monthChanged = shiftDay(parts, date, operation, reset);
    if (! monthChanged) {
      var dayChanged = shiftHour(parts, date, operation, reset);
      if (! dayChanged) {
        var hourChanged = shiftMinute(parts, date, operation, reset);
        if (! hourChanged) {
          break;
        }
      }
    }
  }
  date.seconds(0).milliseconds(0);
  // Return JS Date object
  return date.toDate();
};



/**
 * Returns the time the schedule would have last run at.
 *
 * @this {Seeker}
 * @param {Date} now A Date object
 * @return {Date} The time the schedule would have last run at.
 */
Seeker.prototype.prev = function(parts, now) {
  return this.next(parts, now, true);
};

module.exports = Seeker;
