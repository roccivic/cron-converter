# cron-converter

Cron string parser for node and the browser

[![npm version](https://badge.fury.io/js/cron-converter.svg)](https://badge.fury.io/js/cron-converter)
[![Build status](https://github.com/roccivic/cron-converter/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/roccivic/cron-converter/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/roccivic/cron-converter/badge.svg?branch=master&service=github)](https://coveralls.io/github/roccivic/cron-converter?branch=master)

Try the [online demo](https://cron-converter-demo.netlify.app/) and check the [source code](https://github.com/roccivic/cron-converter-demo) for the integration.

# Install

```bash
yarn add cron-converter
```

or

```bash
npm install cron-converter --save
```

# Compatibility

Versions `2.x.x` of `cron-converter` are not backwards compatible with versions `1.x.x`.

| | `2.x.x`  | `1.x.x` |
| ---- | ------------- | ------------- |
| API | Functional | Object-oriented |
| Loader | ESM and CommonJS | CommonJS only |
| Type definitions | Bundled | Install [`@types/cron-converter`](https://www.npmjs.com/package/@types/cron-converter) |
| Date/time | [`Luxon`](https://moment.github.io/luxon/) | [`Moment.js`](https://momentjs.com/) |
| Tree-shaking | ✅ | ❌ |

# Import

```ts
import { stringToArray, arrayToString, getSchedule, getUnits } from "cron-converter";
```

# Usage

## Convert a string to an array

```ts
// Every 10 mins between 9am and 5pm on the 1st of every month
const arr = stringToArray("*/10 9-17 1 * *");

// Prints:
// [
//   [ 0, 10, 20, 30, 40, 50 ],
//   [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
//   [ 1 ],
//   [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
//   [ 0, 1, 2, 3, 4, 5, 6 ]
// ]
console.log(arr);
```

## Convert an array to a string

```ts
const str = arrayToString([[0], [1], [1], [5], [0, 2, 4, 6]]);

// Prints: '0 1 1 5 */2'
console.log(str);
```

## Formatting options

### outputMonthNames

Default: `false`

```ts
const arr = [[1], [1], [1], [1, 2, 3], [1, 2, 3]];
const str = arrayToString(arr, { outputMonthNames: true });

// Prints: '1 1 1 JAN-MAR 1-3'
console.log(str);
```

### outputWeekdayNames

Default: `false`

```ts
const arr = [[1], [1], [1], [1, 2, 3], [1, 2, 3]];
const str = arrayToString(arr, { outputWeekdayNames: true });

// Prints: '1 1 1 1-3 MON-WED'
console.log(str);
```

### outputHashes

Default: `false`

```ts
const arr = [[1], [1], [1], [1, 6, 11], [0, 1, 2, 3, 4, 5, 6]];

// Prints: '1 1 1 H/5 H'
console.log(arrayToString(arr, { outputHashes: true }));
```

## Get the schedule execution times

```ts
// Convert a string to an array
const arr = stringToArray("*/5 * * * *");

// Get the iterator, initialised to now
let schedule = getSchedule(arr);

// Optionally pass a reference `Date` and a `timezone`
let reference = new Date(2013, 2, 8, 9, 32);
const schedule = getSchedule(arr, reference, "Europe/London");

// Calls to `.next()` and `.prev()` return a Luxon `DateTime` object

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

## Get the units configuration
This is useful if you are creating a user interface. See [units.ts](./src/units.ts).
```ts
const units = getUnits();
```

## Test and build

```bash
git clone https://github.com/roccivic/cron-converter
cd cron-converter
yarn
yarn build
yarn test
yarn coverage
```
