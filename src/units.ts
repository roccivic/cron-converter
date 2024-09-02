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
    name: 'weekday',
    min: 0,
    max: 6,
    alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  }
]);
