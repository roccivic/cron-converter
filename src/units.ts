import { Unit } from "./types.js";

export const units : ReadonlyArray<Unit> = Object.freeze([
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
    name: 'day',
    min: 1,
    max: 31,
    alt: new Map([
      ['L', -1]
    ])
  },
  {
    name: 'month',
    min: 1,
    max: 12,
    alt: new Map([
      ['JAN', 1],
      ['FEB', 2],
      ['MAR', 3],
      ['APR', 4],
      ['MAY', 5],
      ['JUN', 6],
      ['JUL', 7],
      ['AUG', 8],
      ['SEP', 9],
      ['OCT', 10],
      ['NOV', 11],
      ['DEC', 12]
    ])
  },
  {
    name: 'weekday',
    min: 0,
    max: 6,
    alt: new Map([
      ['SUN', 0],
      ['MON', 1],
      ['TUE', 2],
      ['WED', 3],
      ['THU', 4],
      ['FRI', 5],
      ['SAT', 6]
    ])
  }
]);
