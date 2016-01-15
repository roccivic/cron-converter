'use strict';

var util = {};

/**
 * Creates an array of integers from start to end, inclusive.
 *
 * @param {Number} start The first number in the range
 * @param {Number} end The last number in the range
 * @return {Array} The range, as an array of integers
 */
util.range = function(start, end) {
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
};

/**
 * Sorts an array of numbers.
 *
 * @param {Array} array The array to sort
 * @return {Array} The sorted array
 */
util.sort = function(array) {
  array.sort(function(a, b) {
    return a - b;
  });
  return array;
};

/**
 * Flattens a 2-dimensional array
 *
 * @param {Array} arrays A 2-dimensional array
 * @return {Array} The flattened array
 */
util.flatten = function(arrays) {
  return [].concat.apply([], arrays);
};

/**
 * Removes duplicate entries from an array
 *
 * @param {Array} array An array
 * @return {Array} The de-duplicated array
 */
util.dedup = function(array) {
  var result = [];
  array.forEach(function(i) {
    if (result.indexOf(i) < 0) {
      result.push(i);
    }
  });
  return result;
};

module.exports = util;
