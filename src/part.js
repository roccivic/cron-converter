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
  var rangeString = stringParts[0];
  var intervalString = stringParts[1];
  this.unit = units[index];
  this.range = new Range(rangeString, this.unit);
  this.interval = new Interval();
  if (typeof intervalString !== 'undefined') {
    this.range.values = this.interval.apply(
      this.range.values,
      intervalString
    );
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
  return this.range.toArray();
};

/**
 * Returns the cron schedule part as a string.
 *
 * @this {Part}
 * @return {string} The cron schedule part as a string.
 */
Part.prototype.toString = function() {
  var retval = this.range.toString();
  if (retval !== '*') {
    var foundInterval = this.interval.find(this.range.values);
    if (foundInterval) {
      retval = this.interval.toString(
        foundInterval,
        this.unit.min,
        this.unit.max
      );
    }
  }
  return retval;
};

module.exports = Part;
