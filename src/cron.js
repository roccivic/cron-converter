'use strict';

var moment = require('moment');

var Part = require('./part');
var units = require('./units');

/**
 * Creates an instance of Cron.
 * Cron objects each represent a cron schedule.
 *
 * @constructor
 * @this {Cron}
 */
function Cron() {
  this.parts = null;
}

/**
 * Parses a cron string.
 *
 * @this {Cron}
 * @param {string} str The string to parse.
 */
Cron.prototype.parse = function(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid cron string');
  }
  var parts = str.replace(/\s+/g, ' ').trim().split(' ');
  if (parts.length === 5) {
    this.parts = parts.map(function(str, idx) {
      return new Part(str, units[idx]);
    });
  } else {
    throw new Error('Invalid cron string format');
  }
  return this;
};

/**
 * Returns the cron schedule as
 * a 2-dimentional array of integers.
 *
 * @this {Cron}
 * @return {array} The cron schedule as an array.
 */
Cron.prototype.toArray = function() {
  if (this.parts === null) {
    throw new Error('No schedule found');
  }
  return this.parts.map(function(part) {
    return part.toArray();
  });
};

/**
 * Returns the cron schedule as a string.
 *
 * @this {Cron}
 * @return {string} The cron schedule as a string.
 */
Cron.prototype.toString = function() {
  if (this.parts === null) {
    throw new Error('No schedule found');
  }
  return this.parts.join(' ');
};

/**
 * Returns the time the schedule will run next.
 *
 * @this {Cron}
 * @return {Date} The time the schedule will run next.
 */
Cron.prototype.next = function() {
  var date = moment().seconds(0).milliseconds(0);
  // Check month
  while (!this.parts[3].has(date.month() + 1)) {
    date.add(1, 'months').startOf('month');
  }
  // Check day of month and weekday
  while (!this.parts[2].has(date.date()) && !this.parts[4].has(date.day())) {
    date.add(1, 'days').startOf('day');
  }
  // Check hour
  while (!this.parts[1].has(date.hour())) {
    date.add(1, 'hours').startOf('hour');
  }
  // Check minute
  while (!this.parts[0].has(date.minute())) {
    date.add(1, 'minutes').startOf('minute');
  }
  console.log(date.toObject());
  // Return JS Date object
  return date.toDate();
};

module.exports = Cron;
