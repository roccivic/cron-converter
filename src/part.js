'use strict';

var _ = require('lodash');

/**
 * Creates an instance of Part.
 * Part objects represent a collection of positive integers.
 *
 * @constructor
 * @this {Part}
 * @param {object} unit The unit of measurement of time (see units.js).
 * @param {object} options The options to use
 */
function Part(unit, options) {
  if (options) {
    this.options = options;
  } else {
    this.options = {};
  }
  this.unit = unit;
}

/**
 * Validates a range of positive integers.
 *
 * @this {Part}
 * @param {array} arr An array of positive integers.
 */
Part.prototype.fromArray = function(arr) {
  var values = _.sortBy(
    _.union(
      this.fixSunday(
        arr.map(
          function(value) {
            value = parseInt(value, 10);
            if (isNaN(value)) {
              throw new Error('Invalid value');
            }
            return value;
          }
        )
      )
    )
  );
  if (!values.length) {
    throw new Error('Empty interval value');
  }
  if (!this.inRange(values)) {
    throw new Error('Value out of range');
  }
  this.values = values;
};

/**
 * Parses a string as a range of positive integers.
 *
 * @this {Part}
 * @param {string} str The string to be parsed as a range.
 */
Part.prototype.fromString = function(str) {
  var unit = this.unit;
  var stringParts = str.split('/');
  if (stringParts.length > 2) {
    throw new Error('Interval syntax error');
  }
  var rangeString = this.replaceAlternatives(stringParts[0]);
  var parsedValues;
  if (rangeString === '*') {
    parsedValues = _.range(unit.min, unit.max + 1);
  } else {
    parsedValues = _.sortBy(
      _.union(
        this.fixSunday(
          _.flatten(
            _.map(
              rangeString.split(','),
              this.parseRange
            )
          )
        )
      )
    );
    if (!this.inRange(parsedValues)) {
      throw new Error('Value out of range');
    }
  }
  var step = this.parseStep(stringParts[1]);
  this.values = this.applyInterval(parsedValues, step);
};

/**
 * Replace all 7 with 0 as Sunday can
 * be represented by both.
 *
 * @this {Part}
 * @param {array} values The values to process.
 * @return {array} The resulting array.
 */
Part.prototype.fixSunday = function(values) {
  if (this.unit.name === 'weekday') {
    values = values.map(function(value) {
      if (value === 7) {
        return 0;
      }
      return value;
    });
  }
  return values;
};

/**
 * Parses a range string
 *
 * @this {Part}
 * @param {string} range The range string.
 * @return {array} The resulting array.
 */
Part.prototype.parseRange = function(range) {
  var subparts = range.split('-');
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
        'Part syntax error: max range is less than min range'
      );
    }
    return _.range(minValue, maxValue + 1);
  } else {
    throw new Error('Part syntax error');
  }
};

/**
 * Parses the step from a part string
 *
 * @this {Part}
 * @param {string} step The step string.
 * @return {number} The step value.
 */
Part.prototype.parseStep = function(step) {
  if (typeof step !== 'undefined') {
    step = parseInt(step, 10);
    if (isNaN(step) || step < 1) {
      throw new Error('Invalid interval step value');
    }
  }
  return step;
};

/**
 * Applies an interval step to a collection of values
 *
 * @this {Part}
 * @param {array} values A collection of numbers.
 * @param {number} step The step value.
 * @return {array} The resulting collection.
 */
Part.prototype.applyInterval = function(values, step) {
  if (step) {
    values = values.filter(function(value) {
      return value % step === 0;
    });
    if (!values.length) {
      throw new Error('Empty interval value');
    }
  }
  return values;
};

/**
 * Replaces the alternative representations of numbers in a string
 *
 * @this {Part}
 * @param {string} str The string to process.
 * @return {string} The processed string.
 */
Part.prototype.replaceAlternatives = function(str) {
  var unit = this.unit;
  if (unit.alt) {
    str = str.toUpperCase();
    for (var i = 0; i < unit.alt.length; i++) {
      str = str.replace(unit.alt[i], i + unit.min);
    }
  }
  return str;
};

/**
 * Replaces the alternative number representations of strings.
 * Used for weekdays and months.
 *
 * @this {Part}
 * @param {string} str The string to process.
 * @return {string} The processed string.
 */
Part.prototype.replaceOutputAlternatives = function(str) {
  var unit = this.unit;
  for (var i = 0; i < unit.alt.length; i++) {
    str = str.replace(i + unit.min, unit.alt[i]);
  }
  return str;
};

/**
 * Checks if a sorted array is in the range of this.unit
 *
 * @this {Part}
 * @param {array} values The values to test.
 * @return {boolean} Whether the provided values were
 *                   within the range specified by this.unit
 */
Part.prototype.inRange = function(values) {
  var first = values[0];
  var last = values[values.length - 1];
  if (first < this.unit.min || last > this.unit.max) {
    return false;
  }
  return true;
};

/**
 * Returns the smallest value in the range.
 *
 * @this {Part}
 * @return {number} The smallest value.
 */
Part.prototype.min = function() {
  return this.values[0];
};

/**
 * Returns the largest value in the range.
 *
 * @this {Part}
 * @return {number} The largest value.
 */
Part.prototype.max = function() {
  return this.values[this.values.length - 1];
};

/**
 * Returns true if range has all the values of the unit.
 *
 * @this {Part}
 * @return {boolean} true/false.
 */
Part.prototype.isFull = function() {
  return this.values.length === this.unit.max - this.unit.min + 1;
};

/**
 * Returns the difference between first and second elements in the range.
 *
 * @this {Part}
 * @return {boolean} true/false.
 */
Part.prototype.getStep = function() {
  if (this.values.length > 2) {
    var step = this.values[1] - this.values[0];
    if (step > 1) {
      return step;
    }
  }
};

/**
 * Returns true if the range can be represented as an interval.
 *
 * @this {Part}
 * @param {number} step The difference between numbers in the interval.
 * @return {boolean} true/false.
 */
Part.prototype.isInterval = function(step) {
  for (var i = 1; i < this.values.length; i++) {
    var prev = this.values[i - 1];
    var value = this.values[i];
    if (value - prev !== step) {
      return false;
    }
  }
  return true;
};

/**
 * Returns true if the range contains all the interval values.
 *
 * @this {Part}
 * @param {number} step The difference between numbers in the interval.
 * @return {boolean} true/false.
 */
Part.prototype.isFullInterval = function(step) {
  var unit = this.unit;
  var min = this.min();
  var max = this.max();
  var haveAllValues = this.values.length === (max - min) / step + 1;
  if (min - step < unit.min && max + step > unit.max && haveAllValues) {
    return true;
  }
  return false;
};

/**
 * Checks if the range contains the specified value
 *
 * @this {Part}
 * @param {number} value The value to look for.
 * @return {boolean} Whether the value is present in the range.
 */
Part.prototype.has = function(value) {
  return this.values.indexOf(value) > -1;
};

/**
 * Returns the range as an array of positive integers.
 *
 * @this {Part}
 * @return {array} The range as an array.
 */
Part.prototype.toArray = function() {
  return this.values;
};

/**
 * Returns the range as an array of ranges
 * defined as arrays of positive integers.
 *
 * @this {Part}
 * @return {array} The range as a multi-dimentional array.
 */
Part.prototype.toRanges = function() {
  var retval = [];
  var startPart = null;
  _.forEach(this.values, function(value, index, self) {
    if (value !== self[index + 1] - 1) {
      if (startPart !== null) {
        retval.push([startPart, value]);
        startPart = null;
      } else {
        retval.push(value);
      }
    } else if (startPart === null) {
      startPart = value;
    }
  });
  return retval;
};

/**
 * Returns the range as a string.
 *
 * @this {Part}
 * @return {string} The range as a string.
 */
Part.prototype.toString = function() {
  var retval = '';
  if (this.isFull()) {
    if (this.options.outputHashes) {
      retval = 'H';
    } else {
      retval = '*';
    }
  } else {
    var step = this.getStep();
    if (step && this.isInterval(step)) {
      if (this.isFullInterval(step)) {
        if (this.options.outputHashes) {
          retval = 'H/' + step;
        } else {
          retval = '*/' + step;
        }
      } else {
        if (this.options.outputHashes) {
          retval = 'H(' + this.min() + '-' + this.max() + ')/' + step;
        } else {
          retval = this.min() + '-' + this.max() + '/' + step;
        }
      }
    } else {
      retval = this.toRanges().map(function(range) {
        if (range.length) {
          return range[0] + '-' + range[1];
        }
        return range;
      }).join(',');
    }
    if (this.options.outputWeekdayNames && this.unit.name == 'weekday') {
      retval = this.replaceOutputAlternatives(retval);
    } else if (this.options.outputMonthNames && this.unit.name == 'month') {
      retval = this.replaceOutputAlternatives(retval);
    }
  }
  return retval;
};

module.exports = Part;
