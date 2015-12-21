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
  step = parseInt(step, 10);
  if (isNaN(step)) {
    throw new Error('Invalid interval value');
  }
  var allValues = [];
  _.forEach(range.values, function(value) {
    if (value % step === 0) {
      allValues.push(value);
    }
  });
  if (!allValues.length) {
    throw new Error('Empty interval value');
  }
  this.min = range.values[0];
  this.max = range.values[range.values.length - 1];
  this.unit = range.unit;
  this.step = step;
}

/**
 * Returns the interval as an array of integers.
 *
 * @this {Interval}
 * @return {array} The interval as an array.
 */
Interval.prototype.toArray = function() {
  var retval = [];
  for (var i = this.min; i < this.max; i++) {
    if (i % this.step === 0) {
      retval.push(i);
    }
  }
  return retval;
};

/**
 * Generates a string representation of the interval.
 *
 * @this {Interval}
 * @return {string} The resulting string.
 */
Interval.prototype.toString = function() {
  var step = this.step;
  if (this.min - step < this.unit.min && this.max + step > this.unit.max) {
    return '*/' + this.step;
  }
  return this.min + '-' + this.max + '/' + this.step;
};

module.exports = Interval;
