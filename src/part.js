'use strict';

var sprintf = require('sprintf-js');
if (typeof sprintf.sprintf === 'function') { // For node.js
  sprintf = sprintf.sprintf;
}
var util = require('./util');

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
 * Throws an exception.
 * Appends the unit name to the message.
 *
 * @this {Part}
 * @param {string} format A format string to use for the message.
 * @param {array} param The parameter to interpolate into the format string.
 */
Part.prototype.throw = function(format, param) {
  throw new Error(
    sprintf(
      '%(error)s for %(unitName)s',
      {
        error: sprintf(format, param),
        unitName: this.unit.name
      }
    )
  );
};

/**
 * Validates a range of positive integers.
 *
 * @this {Part}
 * @param {array} arr An array of positive integers.
 */
Part.prototype.fromArray = function(arr) {
  var values = util.sort(
    util.dedup(
      this.fixSunday(
        arr.map(
          function(value) {
            var parsedValue = parseInt(value, 10);
            if (isNaN(parsedValue)) {
              this.throw('Invalid value "%s"', value);
            }
            return parsedValue;
          },
          this
        )
      )
    )
  );
  if (!values.length) {
    this.throw('Empty interval value');
  }
  var value = this.outOfRange(values);
  if (typeof value !== 'undefined') {
    this.throw('Value "%s" out of range', value);
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
    this.throw('Invalid value "%s"', str);
  }
  var rangeString = this.replaceAlternatives(stringParts[0]);
  var parsedValues;
  if (rangeString === '*') {
    parsedValues = util.range(unit.min, unit.max);
  } else {
    parsedValues = util.sort(
      util.dedup(
        this.fixSunday(
          util.flatten(
            rangeString.split(',').map(
              function(range) {
                return this.parseRange(range, str);
              },
              this
            )
          )
        )
      )
    );
    var value = this.outOfRange(parsedValues);
    if (typeof value !== 'undefined') {
      this.throw('Value "%s" out of range', value);
    }
  }
  var step = this.parseStep(stringParts[1]);
  var intervalValues = this.applyInterval(parsedValues, step);
  if (!intervalValues.length) {
    this.throw('Empty interval value "%s"', str);
  }
  this.values = intervalValues;
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
 * @param {string} context The operation context string.
 * @return {array} The resulting array.
 */
Part.prototype.parseRange = function(range, context) {
  var subparts = range.split('-');
  if (subparts.length === 1) {
    var value = parseInt(subparts[0], 10);
    if (isNaN(value)) {
      this.throw('Invalid value "%s"', context);
    }
    return [value];
  } else if (subparts.length === 2) {
    var minValue = parseInt(subparts[0], 10);
    var maxValue = parseInt(subparts[1], 10);
    if (maxValue <= minValue) {
      this.throw(
        'Max range is less than min range in "%s"',
        range
      );
    }
    return util.range(minValue, maxValue);
  } else {
    this.throw(
      'Invalid value "%s"',
      range
    );
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
    var parsedStep = parseInt(step, 10);
    if (isNaN(parsedStep) || parsedStep < 1) {
      this.throw('Invalid interval step value "%s"', step);
    }
    return parsedStep;
  }
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
 * Finds an element from values that is outside of the range of this.unit
 *
 * @this {Part}
 * @param {array} values The values to test.
 * @return {mixed} An integer is a value out of range was found,
  *                otherwise undefined.
 */
Part.prototype.outOfRange = function(values) {
  var first = values[0];
  var last = values[values.length - 1];
  if (first < this.unit.min) {
    return first;
  } else if (last > this.unit.max) {
    return last;
  }
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
  this.values.forEach(function(value, index, self) {
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
    var format;
    if (step && this.isInterval(step)) {
      if (this.isFullInterval(step)) {
        if (this.options.outputHashes) {
          format = 'H/%d';
        } else {
          format = '*/%d';
        }
        retval = sprintf(format, step);
      } else {
        if (this.options.outputHashes) {
          format = 'H(%s-%s)/%d';
        } else {
          format = '%s-%s/%d';
        }
        retval = sprintf(
          format,
          this.formatValue(this.min()),
          this.formatValue(this.max()),
          step
        );
      }
    } else {
      retval = this.toRanges().map(function(range) {
        if (range.length) {
          return sprintf(
            '%s-%s',
            this.formatValue(range[0]),
            this.formatValue(range[1])
          );
        }
        return this.formatValue(range);
      }, this).join(',');
    }
  }
  return retval;
};

/**
 * Formats weekday and month names as string
 * when the relevant options are set.
 *
 * @param {number} value The value to process.
 * @return {mixed} The formatted string or number.
 */
Part.prototype.formatValue = function(value) {
  if (this.options.outputWeekdayNames && this.unit.name === 'weekday' ||
    this.options.outputMonthNames && this.unit.name === 'month') {
    return this.unit.alt[value - this.unit.min];
  }
  return value;
};

module.exports = Part;
