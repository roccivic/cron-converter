# cron-converter

Cron string parser for node

## Install

```
npm install
```

## Lint

```
gulp lint
```

## Test

```
gulp test
```

## Use

```js
// Get the Cron constructor
var Cron = require('cron');

// Create a new instance
var cronInstance = new Cron();

// Parse a cron string
cronInstance.parse('1 1 1 1 1');

// Prints: [ [1], [1], [1], [1], [1] ]
console.log(cronInstance.toArray());

// Prints: '1 1 1 1 1'
console.log(cronInstance.toString());

```
