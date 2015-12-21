'use strict';

var Range = require('./range');
var Interval = require('./interval');
var units = require('./units');

/**
 * Creates an instance of Part.
 * Part objects represent one part of a cron schedule.
 *
 * @constructor
 * @this {Part}
 */
function Part(str, index) {
  var stringParts = str.split('/');
  if (stringParts.length > 2) {
    throw new Error('Interval syntax error');
  }
  this.unit = units[index];
  var rangeString = stringParts[0];
  var stepString = stringParts[1];
  this.range = new Range(rangeString, this.unit);
  if (typeof stepString !== 'undefined') {
    this.interval = new Interval(this.range, stepString);
  }
}

/**
 * Returns the cron schedule part as
 * an array of integers.
 *
 * @this {Part}
 * @return {array} The cron schedule part as an array.
 */
Part.prototype.toArray = function() {
  if (this.interval) {
    return this.interval.toArray();
  }
  return this.range.toArray();
};

/**
 * Returns the cron schedule part as a string.
 *
 * @this {Part}
 * @return {string} The cron schedule part as a string.
 */
Part.prototype.toString = function() {
  if (this.interval) {
    return this.interval.toString();
  }
  return this.range.toString();
};

module.exports = Part;
