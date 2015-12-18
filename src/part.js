(function(module) {
  'use strict';
  var Range = require('./range');
  var units = require('./units');
  function Part(str, index) {
    var unit = units[index];
    this.range = new Range(str, unit.min, unit.max);
  }
  Part.prototype.toString = function() {
    return this.range.toString();
  };
  module.exports = Part;
})(module);
