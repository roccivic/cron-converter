'use strict';

var _ = require('lodash');

/**
 * Creates an instance of Interval.
 * Interval objects represent a collection of
 * evenly spaced positive integers.
 *
 * @constructor
 * @this {Interval}
 * @param {Range} range The string to be parsed as a range.
 * @param {number} step The difference between numbers in the interval;
 */
function Interval(range, step) {
  var values = [];
  _.forEach(range.values, function(value) {
    if (value % step === 0) {
      values.push(value);
    }
  });
  if (!values.length) {
    throw new Error('Empty interval value');
  }
  range.values = values;
  this.range = range;
  this.step = step;
}

/**
 * Returns the interval as an array of integers.
 *
 * @this {Interval}
 * @return {array} The interval as an array.
 */
Interval.prototype.toArray = function() {
  return this.range.values;
};

/**
 * Generates a string representation of the interval.
 *
 * @this {Interval}
 * @return {string} The resulting string.
 */
Interval.prototype.toString = function() {
  var step = this.step;
  var unit = this.range.unit;
  var min = this.range.values[0];
  var max = this.range.values[this.range.values.length - 1];
  if (min - step < unit.min && max + step > unit.max) {
    return '*/' + this.step;
  }
  if (this.range.values.length == 1) {
    return min;
  } else if (this.range.values.length == 2) {
    return min + ',' + max;
  }
  return this.range.toString() + '/' + this.step;
};

module.exports = Interval;
