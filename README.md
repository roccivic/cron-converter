# cron-converter

Cron string parser for node and the browser

[![MIT License Badge](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/roccivic/cron-converter/blob/master/LICENCE.txt)
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
[![npm](https://img.shields.io/npm/v/cron-converter.svg)](https://www.npmjs.com/package/cron-converter)
![Bower](https://img.shields.io/bower/v/cron-converter.svg)
[![Build Status](https://travis-ci.org/roccivic/cron-converter.svg?branch=master)](https://travis-ci.org/roccivic/cron-converter)
[![Coverage Status](https://coveralls.io/repos/roccivic/cron-converter/badge.svg?branch=master&service=github)](https://coveralls.io/github/roccivic/cron-converter?branch=master)


[![Dependency Status](https://david-dm.org/roccivic/cron-converter.svg)](https://david-dm.org/roccivic/cron-converter)
[![devDependency Status](https://david-dm.org/roccivic/cron-converter/dev-status.svg)](https://david-dm.org/roccivic/cron-converter#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/roccivic/cron-converter/badges/gpa.svg)](https://codeclimate.com/github/roccivic/cron-converter)
[![Inline docs](http://inch-ci.org/github/roccivic/cron-converter.svg?branch=master)](http://inch-ci.org/github/roccivic/cron-converter)
[![todofy badge](https://todofy.org/b/roccivic/cron-converter)](https://todofy.org/r/roccivic/cron-converter)

[![Saucelabs Test Status](https://saucelabs.com/browser-matrix/cron-converter.svg)](https://saucelabs.com/u/cron-converter)

## Install

#### Npm
```bash
npm install cron-converter --save
```

#### Bower
```bash
bower install cron-converter --save
```

## Use
This step is for usage from node,
the bower build exposes a global
```js
var Cron = require('cron-converter');
```

### Create a new instance
```js
var cronInstance = new Cron();
```

### Parse a cron string
```js
// Every 10 mins between 9am and 5pm on the 1st of every month
cronInstance.fromString('*/10 9-17 1 * *');

// Prints: '*/10 9-17 1 * *'
console.log(cronInstance.toString());

// Prints:
// [
//   [ 0, 10, 20, 30, 40, 50 ],
//   [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
//   [ 1 ],
//   [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
//   [ 0, 1, 2, 3, 4, 5, 6 ]
// ]
console.log(cronInstance.toArray());
```

### Parse an Array
```js
cronInstance.fromArray([[0], [1], [1], [5], [0,2,4,6]]);

// Prints: '0 1 1 5 */2'
console.log(cronInstance.toString());
```

### Get the schedule execution times
```js
// Parse a string to init a schedule
cronInstance.fromString('*/5 * * * *');

// Get the iterator, initialised to now
var schedule = cronInstance.schedule();

// Optionally, use a reference Date or moment object
var reference = new Date(2013, 2, 8, 9, 32);
reference = moment([2013, 2, 8, 9, 32]);
// And pass the reference to .schedule()
schedule = cronInstance.schedule(reference);

// Calls to ```.next()``` and ```.prev()```
// return a Moment.js object

// Prints: '2013-03-08T09:35:00+00:00''
console.log(schedule.next().format());
// Prints: '2013-03-08T09:40:00+00:00''
console.log(schedule.next().format());

// Reset
schedule.reset();

// Prints: '2013-03-08T09:30:00+00:00''
console.log(schedule.prev().format());
// Prints: '2013-03-08T09:25:00+00:00''
console.log(schedule.prev().format());
```

### Constructor options

#### outputWeekdayNames and outputMonthNames
Default: false
```js
var cronInstance = new Cron({
  outputWeekdayNames: true,
  outputMonthNames: true
});
cronInstance.fromString('*/5 9-17/2 * 1-3 1-5');
// Prints: '*/5 *(10-16)/2 * JAN-MAR MON-FRI'
console.log(cronInstance.toString());
```

#### outputHashes
Default: false
```js
var cronInstance = new Cron({
  outputHashes: true
});
cronInstance.fromString('*/5 9-17/2 * 1-3 1-5');
// Prints: 'H/5 H(10-16)/2 H 1-3 1-5'
console.log(cronInstance.toString());
```

#### timezone
Default: Local timezone
```js
var cronInstance = new Cron({
  timezone: "Europe/London"
});
cronInstance.fromString('*/5 9-17/2 * 1-3 1-5');
// Finds the next execution time in the London timezone
console.log(cronInstance.schedule().next());
```

## Test and build

```bash
git clone https://github.com/roccivic/cron-converter
cd cron-converter
npm install -g gulp
npm install
gulp
```

Run ```gulp watch``` to continuously run unit tests as you edit the code
