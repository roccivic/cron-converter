'use strict';

var interval = {};
var _ = require('lodash');

/**
 * Applies an interval to an array
 *
 * @param {array} values An array of positive integers to filter.
 * @param {string} interval The interval to leave between numbers in the output.
 * @return {array} The resulting array.
 */
interval.apply = function(values, interval) {
  if (typeof interval === 'undefined') {
    return values;
  }
  interval = parseInt(interval, 10);
  if (isNaN(interval)) {
    throw new Error('Invalid interval value');
  }
  var retval = [];
  _.forEach(values, function(value) {
    if (value % interval === 0) {
      retval.push(value);
    }
  });
  return retval;
};

/**
 * Finds an interval in an array.
 * Returns undefined, if no matches are found.
 *
 * @param {array} values An array of positive integers to filter.
 * @return {object} The found object.
 */
interval.find = function(values) {
  if (values.length < 3) {
    return;
  }
  var diff = null;
  var min = values[0];
  var max = values[values.length - 1];
  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    if (i === 0) {
      diff = values[1] - value;
    } else {
      if (typeof values[i + 1] !== 'undefined') {
        var newDiff = values[i + 1] - value;
        if (newDiff !== diff) {
          return;
        }
      }
    }
  }
  if (diff > 1) {
    return {
      min: min,
      max: max,
      diff: diff
    };
  }
};

/**
 * Generates a string representation of an interval found with find()
 *
 * @param {object} foundInterval The interval returned by find().
 * @param {number} min The minimum value of the range.
 * @param {number} max The maximum value of the range.
 * @return {string} The resulting string.
 */
interval.toString = function(foundInterval, min, max) {
  if (foundInterval.min === min && foundInterval.max === max) {
    return '*/' + foundInterval.diff;
  }
  return foundInterval.min + '-' + foundInterval.max + '/' + foundInterval.diff;
};

module.exports = interval;
