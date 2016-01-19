'use strict';

var moment = require('moment-timezone');

/**
 * Creates an instance of Seeker.
 * Seeker objects search for execution times of a cron schedule.
 *
 * @constructor
 * @this {Seeker}
 */
function Seeker(cron, now) {
  if (cron.parts === null) {
    throw new Error('No schedule found');
  }
  var date;
  if (cron.options.timezone) {
    date = moment.tz(now, cron.options.timezone);
  } else {
    date = moment(now);
  }
  if (!date.isValid()) {
    throw new Error('Invalid date provided');
  }
  if (date.seconds() > 0) {
    // Add a minute to the date to prevent returning dates in the past
    date.add(1, 'minute');
  }
  this.cron = cron;
  this.now = date;
  this.date = date;
  this.pristine = true;
}

/**
 * Resets the iterator.
 *
 * @this {Seeker}
 */
Seeker.prototype.reset = function() {
  this.pristine = true;
  this.date = moment(this.now);
};

/**
 * Returns the time the schedule would run next.
 *
 * @this {Seeker}
 * @return {Date} The time the schedule would run next.
 */
Seeker.prototype.next = function() {
  if (this.pristine) {
    this.pristine = false;
  } else {
    this.date.add(1, 'minute');
  }
  return findDate(this.cron.parts, this.date);
};

/**
 * Returns the time the schedule would have last run at.
 *
 * @this {Seeker}
 * @return {Date} The time the schedule would have last run at.
 */
Seeker.prototype.prev = function() {
  this.pristine = false;
  return findDate(this.cron.parts, this.date, true);
};

/**
 * Returns the time the schedule would run next.
 *
 * @param {array} parts An array of Cron parts.
 * @param {Date} date The reference date.
 * @param {boolean} reverse Whether to find the previous value instead of next.
 * @return {Moment} The date the schedule would have executed at.
 */
var findDate = function(parts, date, reverse) {
  var operation = 'add';
  var reset = 'startOf';
  if (reverse) {
    operation = 'subtract';
    reset = 'endOf';
    date.subtract(1, 'minute'); // Ensure prev and next cannot be same time
  }
  var retry = 24;
  while (--retry) {
    shiftMonth(parts, date, operation, reset);
    var monthChanged = shiftDay(parts, date, operation, reset);
    if (!monthChanged) {
      var dayChanged = shiftHour(parts, date, operation, reset);
      if (!dayChanged) {
        var hourChanged = shiftMinute(parts, date, operation, reset);
        if (!hourChanged) {
          break;
        }
      }
    }
  }
  if (!retry) {
    throw new Error('Unable to find execution time for schedule');
  }
  date.seconds(0).milliseconds(0);
  // Return new moment object
  return moment(date);
};

/**
 * Increments/decrements the month value of a date,
 * until a month that matches the schedule is found
 *
 * @param {array} parts An array of Cron parts.
 * @param {Moment} date The date to shift.
 * @param {string} operation The function to call on date: 'add' or 'subtract'
 * @param {string} reset The function to call on date: 'startOf' or 'endOf'
 */
var shiftMonth = function(parts, date, operation, reset) {
  while (!parts[3].has(date.month() + 1)) {
    date[operation](1, 'months')[reset]('month');
  }
};

/**
 * Increments/decrements the day value of a date,
 * until a day that matches the schedule is found
 *
 * @param {array} parts An array of Cron parts.
 * @param {Moment} date The date to shift.
 * @param {string} operation The function to call on date: 'add' or 'subtract'
 * @param {string} reset The function to call on date: 'startOf' or 'endOf'
 * @return {boolean} Whether the month of the date was changed
 */
var shiftDay = function(parts, date, operation, reset) {
  var currentMonth = date.month();
  while (!parts[2].has(date.date()) || !parts[4].has(date.day())) {
    date[operation](1, 'days')[reset]('day');
    if (currentMonth !== date.month()) {
      return true;
    }
  }
  return false;
};

/**
 * Increments/decrements the hour value of a date,
 * until an hour that matches the schedule is found
 *
 * @param {array} parts An array of Cron parts.
 * @param {Moment} date The date to shift.
 * @param {string} operation The function to call on date: 'add' or 'subtract'
 * @param {string} reset The function to call on date: 'startOf' or 'endOf'
 * @return {boolean} Whether the day of the date was changed
 */
var shiftHour = function(parts, date, operation, reset) {
  var currentDay = date.date();
  while (!parts[1].has(date.hour())) {
    date[operation](1, 'hours')[reset]('hour');
    if (currentDay !== date.date()) {
      return true;
    }
  }
  return false;
};

/**
 * Increments/decrements the minute value of a date,
 * until an minute that matches the schedule is found
 *
 * @param {array} parts An array of Cron parts.
 * @param {Moment} date The date to shift.
 * @param {string} operation The function to call on date: 'add' or 'subtract'
 * @param {string} reset The function to call on date: 'startOf' or 'endOf'
 * @return {boolean} Whether the hour of the date was changed
 */
var shiftMinute = function(parts, date, operation, reset) {
  var currentHour = date.hour();
  while (!parts[0].has(date.minute())) {
    date[operation](1, 'minutes')[reset]('minute');
    if (currentHour !== date.hour()) {
      return true;
    }
  }
  return false;
};

module.exports = Seeker;
