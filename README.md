# cron-converter

Cron string parser for node and the browser

[![MIT License Badge](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/roccivic/cron-converter/blob/master/LICENCE.txt)
[![npm](https://img.shields.io/npm/v/cron-converter.svg)](https://www.npmjs.com/package/cron-converter)
![Bower](https://img.shields.io/bower/v/cron-converter.svg)
[![Build Status](https://travis-ci.org/roccivic/cron-converter.svg)](https://travis-ci.org/roccivic/cron-converter)
[![Coverage Status](https://coveralls.io/repos/roccivic/cron-converter/badge.svg?branch=master&service=github)](https://coveralls.io/github/roccivic/cron-converter?branch=master)


[![Dependency Status](https://david-dm.org/roccivic/cron-converter.svg)](https://david-dm.org/roccivic/cron-converter)
[![devDependency Status](https://david-dm.org/roccivic/cron-converter/dev-status.svg)](https://david-dm.org/roccivic/cron-converter#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/roccivic/cron-converter/badges/gpa.svg)](https://codeclimate.com/github/roccivic/cron-converter)
[![Inline docs](http://inch-ci.org/github/roccivic/cron-converter.svg?branch=master)](http://inch-ci.org/github/roccivic/cron-converter)

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
cronInstance.fromString('1 1 1 1 1');

// Prints: [ [1], [1], [1], [1], [1] ]
console.log(cronInstance.toArray());

// Prints: '1 1 1 1 1'
console.log(cronInstance.toString());
```

### Validate an Array
```js
cronInstance.fromArray([[0], [1], [1], [5], [0,2,4,6]]);

// Prints: '0 1 1 5 */2'
console.log(cronInstance.toString());
```

### Get next and last execution times
Assuming now it is 09:32:00 on 08 Feb 2013
```js
cronInstance.fromString('*/5 * * * *');

// Prints: 'Fri Feb 08 2013 09:35:00 GMT+0000 (GMT Standard Time)'
console.log(cronInstance.next());

// Prints: 'Fri Feb 08 2013 09:30:00 GMT+0000 (GMT Standard Time)'
console.log(cronInstance.prev());
```
Pass a reference Date
```js
cronInstance.fromString('*/5 * * * *');

// Create a reference Date object
var now = new Date(2015, 6, 7, 15, 23);

// Prints: 'Tue Jul 07 2015 15:25:00 GMT+0100 (GMT Daylight Time)'
console.log(cronInstance.next(now));

// Prints: 'Tue Jul 07 2015 15:20:00 GMT+0100 (GMT Daylight Time)'
console.log(cronInstance.prev(now));
```

### Constructor options
All default to ```false```
```js
var cronInstance = new Cron({
  outputWeekdayNames: true,
  outputMonthNames: true,
  outputHashes: true
});
cronInstance.fromString('*/5 9-17/2 * 1-3 1-5');

// Prints: 'H/5 H(10-16)/2 H JAN-MAR MON-FRI'
console.log(cronInstance.toString());
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
