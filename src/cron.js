(function(module) {
  'use strict';
  var Part = require('./part');
  function Cron() {
    this.parts = null;
  }
  Cron.prototype.parse = function(str) {
    var parts = str.trim().split(' ');
    if (parts.length === 5) {
      this.parts = parts.map(function(str, idx) {
        return new Part(str, idx);
      });
    } else {
      throw new Error(
          'Invalid cron string format'
      );
    }
    return this;
  };
  Cron.prototype.toArray = function() {
    if (this.parts === null) {
      throw new Error(
          'No schedule found'
      );
    }
    return this.parts;
  };
  Cron.prototype.toString = function() {
    if (this.parts === null) {
      throw new Error(
          'No schedule found'
      );
    }
    return this.parts.join(' ');
  };
  module.exports = Cron;
})(module);
