import moment, { tz, Moment } from "moment-timezone";
import { assertValidArray } from "./util";

/**
 * `Schedule` objects search for execution times of a cron schedule
 */
export class Schedule {
  arr: number[][];
  now: Moment;
  date: Moment;
  pristine: boolean;

  /**
   * Default constructor
   *
 * @param arr The cron schedule as an array
 * @param now An optional reference `Date`
 * @param timezone An optional timezone string
   */
  constructor(arr: number[][], now?: Date | string, timezone?: string) {
    assertValidArray(arr);
    let date: Moment;
    if (timezone) {
      date = tz(now, timezone);
    } else {
      date = moment(now);
    }
    if (!date.isValid()) {
      throw new Error("Invalid date provided");
    }
    if (date.seconds() > 0) {
      // Add a minute to the date to prevent returning dates in the past
      date.add(1, "minute");
    }
    this.arr = arr;
    this.now = date;
    this.date = date;
    this.pristine = true;
  }

  /**
   * Resets the iterator
   */
  reset() {
    this.pristine = true;
    this.date = moment(this.now);
  }

  /**
   * Returns the time the schedule would run next
   *
   * @return The time the schedule would run next
   */
  next() {
    if (this.pristine) {
      this.pristine = false;
    } else {
      this.date.add(1, "minute");
    }
    return findDate(this.arr, this.date, false);
  }

  /**
   * Returns the time the schedule would have last run at
   *
   * @return The time the schedule would have last run at
   */
  prev() {
    this.pristine = false;
    return findDate(this.arr, this.date, true);
  }
}

/**
 * Returns the time the schedule would run next
 *
 * @param arr The cron schedule as an array
 * @param date The reference date
 * @param reverse Whether to find the previous value instead of next
 * @return The date the schedule would have executed at
 */
const findDate = (arr: number[][], date: Moment, reverse: boolean) => {
  const operation = reverse ? "subtract" : "add";
  const reset = reverse ? "endOf" : "startOf";
  if (reverse) {
    date.subtract(1, "minute"); // Ensure prev and next cannot be same time
  }
  let retry = 24;
  while (--retry) {
    shiftMonth(arr, date, operation, reset);
    let monthChanged = shiftDay(arr, date, operation, reset);
    if (!monthChanged) {
      let dayChanged = shiftHour(arr, date, operation, reset);
      if (!dayChanged) {
        let hourChanged = shiftMinute(arr, date, operation, reset);
        if (!hourChanged) {
          break;
        }
      }
    }
  }
  if (!retry) {
    throw new Error("Unable to find execution time for schedule");
  }
  date.seconds(0).milliseconds(0);
  // Return new moment object
  return moment(date);
};

/**
 * Increments/decrements the month value of a date,
 * until a month that matches the schedule is found
 *
 * @param arr The cron schedule as an array
 * @param date The date to shift
 * @param operation The function to call on date: 'add' or 'subtract'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 */
const shiftMonth = (
  arr: number[][],
  date: Moment,
  operation: "add" | "subtract",
  reset: "startOf" | "endOf"
) => {
  while (arr[3].indexOf(date.month() + 1) === -1) {
    date[operation](1, "months")[reset]("month");
  }
};

/**
 * Increments/decrements the day value of a date,
 * until a day that matches the schedule is found
 *
 * @param arr The cron schedule as an array
 * @param date The date to shift
 * @param operation The function to call on date: 'add' or 'subtract'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 * @return Whether the month of the date was changed
 */
const shiftDay = (
  arr: number[][],
  date: Moment,
  operation: "add" | "subtract",
  reset: "startOf" | "endOf"
) => {
  const currentMonth = date.month();
  while (
    arr[2].indexOf(date.date()) === -1 ||
    arr[4].indexOf(date.day()) === -1
  ) {
    date[operation](1, "days")[reset]("day");
    if (currentMonth !== date.month()) {
      return true;
    }
  }
  return false;
};

/**
 * Increments/decrements the hour value of a date,
 * until an hour that matches the schedule is found
 *
 * @param arr The cron schedule as an array
 * @param date The date to shift
 * @param operation The function to call on date: 'add' or 'subtract'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 * @return Whether the hour of the date was changed
 */
const shiftHour = (
  arr: number[][],
  date: Moment,
  operation: "add" | "subtract",
  reset: "startOf" | "endOf"
) => {
  const currentDay = date.date();
  while (arr[1].indexOf(date.hour()) === -1) {
    date[operation](1, "hours")[reset]("hour");
    if (currentDay !== date.date()) {
      return true;
    }
  }
  return false;
};

/**
 * Increments/decrements the minute value of a date,
 * until an minute that matches the schedule is found
 *
 * @param arr The cron schedule as an array.
 * @param date The date to shift.
 * @param operation The function to call on date: 'add' or 'subtract'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 * @return Whether the minute of the date was changed
 */
const shiftMinute = (
  arr: number[][],
  date: Moment,
  operation: "add" | "subtract",
  reset: "startOf" | "endOf"
) => {
  const currentHour = date.hour();
  while (arr[0].indexOf(date.minute()) === -1) {
    date[operation](1, "minutes")[reset]("minute");
    if (currentHour !== date.hour()) {
      return true;
    }
  }
  return false;
};
