'use strict';

var Range = require('./range');
var units = require('./units');

/**
 * Creates an instance of Part.
 * Part objects represent one part
 * of a cron schedule.
 *
 * @constructor
 * @this {Part}
 */
function Part(str, index) {
  var unit = units[index];
  this.range = new Range(str, unit.min, unit.max);
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
