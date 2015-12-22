'use strict';

var Range = require('./range');

/**
 * Creates an instance of Part.
 * Part objects represent one part of a cron schedule.
 *
 * @constructor
 * @this {Part}
 */
function Part(str, unit) {
  var stringParts = str.split('/');
  if (stringParts.length > 2) {
    throw new Error('Interval syntax error');
  }
  var rangeString = stringParts[0];
  var step = stringParts[1];
  if (typeof step !== 'undefined') {
    step = parseInt(step, 10);
    if (isNaN(step) || step < 1) {
      throw new Error('Invalid interval value');
    }
  }
  this.range = new Range(rangeString, unit, step);
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
  return this.range.toString();
};

module.exports = Part;
