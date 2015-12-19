'use strict';

var _ = require('lodash');

/**
 * Creates an instance of Range.
 * Range objects represent
 * a range of positive integers.
 *
 * @constructor
 * @this {Range}
 * @param {string} str The string to be parsed as a range.
 * @param {number} min The minimum range value (inclusive).
 * @param {number} max The maximum range value (inclusive).
 */
function Range(str, min, max) {
  this.min = min;
  this.max = max;
  if (str === '*') {
    this.values = _.range(min, max + 1);
  } else {
    var parsed = _.map(str.split(','), function(part) {
      var subparts = part.split('-');
      if (subparts.length === 1) {
        var value = parseInt(subparts[0], 10);
        if (isNaN(value)) {
          throw new Error('Invalid value');
        }
        return [value];
      } else if (subparts.length === 2) {
        var minValue = parseInt(subparts[0], 10);
        var maxValue = parseInt(subparts[1], 10);
        if (maxValue <= minValue) {
          throw new Error(
            'Range syntax error: max range is less than min range'
          );
        }
        return _.range(minValue, maxValue + 1);
      } else {
        throw new Error('Range syntax error');
      }
    });
    this.values = _.sortBy(_.union(_.flatten(parsed)));
    var first = this.values[0];
    var last = this.values[this.values.length - 1];
    if (first < min || first > max || last < min || last > max) {
      throw new Error('Value out of range');
    }
  }
}

/**
 * Returns the range as an array of integers.
 *
 * @this {Range}
 * @return {array} The range as an array.
 */
Range.prototype.toArray = function() {
  return this.values;
};

/**
 * Returns the range as a string.
 *
 * @this {Range}
 * @return {string} The range as a string.
 */
Range.prototype.toString = function() {
  if (this.values.length === this.max - this.min + 1) {
    return '*';
  }
  var retval = [];
  var startRange = null;
  _.forEach(this.values, function(value, index, self) {
    if (value !== self[index + 1] - 1) {
      if (startRange) {
        retval.push(startRange + '-' + value);
        startRange = null;
      } else {
        retval.push(value);
      }
    } else if (!startRange) {
      startRange = value;
    }
  });
  return retval.join(',');
};

module.exports = Range;
