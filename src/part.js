(function() {
  'use strict';
  var Range = require('./range');
  var units = require('./units');
  function Part(str, index) {
    var unit = units[index];
    this.range = new Range(str, unit.min, unit.max);
  }
  Part.prototype.toArray = function() {
    return this.range.toArray();
  };
  Part.prototype.toString = function() {
    return this.range.toString();
  };
  module.exports = Part;
}());
