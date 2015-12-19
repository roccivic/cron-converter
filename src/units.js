'use strict';

module.exports = [
  {
    name: 'minute',
    min: 0,
    max: 59
  },
  {
    name: 'hour',
    min: 0,
    max: 23
  },
  {
    name: 'dayOfMonth',
    min: 1,
    max: 31
  },
  {
    name: 'month',
    min: 1,
    max: 12,
    alt: [
      'JAN', 'FEB', 'MAR', 'APR',
      'MAY', 'JUN', 'JUL', 'AUG',
      'SEP', 'OCT', 'NOV', 'DEC'
    ]
  },
  {
    name: 'dayOfWeek',
    min: 0,
    max: 6,
    alt: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  }
];
