'use strict';

var test = require('tape');
var Part = require('../src/part');

var validRanges = [
  {
    input: '0-4',
    arr: [0,1,2,3,4],
    output: '0-4',
    min: 0,
    max: 6
  },
  {
    input: 'SUN',
    arr: [0],
    output: '0',
    min: 0,
    max: 6,
    alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  },
  {
    input: 'SUN,MON,TUE',
    arr: [0,1,2],
    output: '0-2',
    min: 0,
    max: 6,
    alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  },
  {
    input: 'mon-fri',
    arr: [1,2,3,4,5],
    output: '1-5',
    min: 0,
    max: 6,
    alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  },
  {
    input: '1,2,3',
    arr: [1,2,3],
    output: '1-3',
    min: 1,
    max: 10
  },
  {
    input: '1,3,2',
    arr: [1,2,3],
    output: '*',
    min: 1,
    max: 3
  },
  {
    input: '1,2,5-10',
    arr: [1,2,5,6,7,8,9,10],
    output: '1-2,5-10',
    min: 1,
    max: 30
  },
  {
    input: '*',
    arr: [1,2,3,4,5],
    output: '*',
    min: 1,
    max: 5
  },
  {
    input: '5',
    arr: [5],
    output: '5',
    min: 1,
    max: 5
  },
  {
    input: '1-10/5',
    arr: [5,10],
    output: '5,10',
    min: 0,
    max: 59
  },
  {
    input: '5-30/5',
    arr: [5,10,15,20,25,30],
    output: '5-30/5',
    min: 0,
    max: 59
  },
  {
    input: '5,10,15,20,25,30',
    arr: [5,10,15,20,25,30],
    output: '5-30/5',
    min: 0,
    max: 59
  },
  {
    input: '5-20,35-45/5',
    arr: [5,10,15,20,35,40,45],
    output: '5,10,15,20,35,40,45',
    min: 0,
    max: 59
  }
];
validRanges.forEach(function(validRange) {
  test('Should parse valid string: "' + validRange.input + '"', function(t) {
    var range = new Part(
      validRange
    );
    t.plan(2);
    range.fromString(validRange.input);
    t.deepEqual(
        range.toArray(),
        validRange.arr
    );
    t.equal(
        range.toString(),
        validRange.output
    );
  });
});
