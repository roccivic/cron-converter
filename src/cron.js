(function() {
  'use strict';
  var _ = require('lodash');
  var Part = require('./part');
  function Cron() {
    this.parts = null;
  }
  Cron.prototype.parse = function(str) {
    var parts = str.trim().split(' ');
    if (parts.length === 5) {
      this.parts = _.map(parts, function(str, idx) {
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
    return this.parts.map(function(part) {
      return part.toArray();
    });
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
}());
