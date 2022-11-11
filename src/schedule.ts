import { assertValidArray } from "./util.js";
import { DateTime } from "luxon";

/**
 * `Schedule` objects search for execution times of a cron schedule
 */
export class Schedule {
  readonly arr: number[][];
  readonly now: DateTime;
  date: DateTime;
  pristine: boolean;

  /**
   * Default constructor
   *
   * @param arr The cron schedule as an array
   * @param now An optional reference date
   * @param timezone An optional timezone string
   */
  constructor(arr: number[][], now?: Date | string, timezone?: string) {
    assertValidArray(arr);
    let date: DateTime;
    if (now === undefined) {
      date = DateTime.now();
    } else if (typeof now === "string") {
      date = DateTime.fromISO(now);
    } else {
      date = DateTime.fromJSDate(now);
    }
    if (!date.isValid) {
      throw new Error("Invalid reference date provided");
    }
    if (timezone) {
      date = date.setZone(timezone);
    }
    if (!date.isValid) {
      throw new Error("Invalid timezone provided");
    }
    if (date.second > 0) {
      // plus a minute to the date to prevent returning dates in the past
      date = date.plus({ minute: 1 });
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
    this.date = this.now.plus(0);
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
      this.date = this.date.plus({ minute: 1 });
    }
    this.date = findDate(this.arr, this.date, false);
    return this.date;
  }

  /**
   * Returns the time the schedule would have last run at
   *
   * @return The time the schedule would have last run at
   */
  prev() {
    this.pristine = false;
    this.date = findDate(this.arr, this.date, true);
    return this.date;
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
const findDate = (arr: number[][], date: DateTime, reverse: boolean) => {
  const operation = reverse ? "minus" : "plus";
  const reset = reverse ? "endOf" : "startOf";
  if (reverse) {
    date = date.minus({ minute: 1 }); // Ensure prev and next cannot be same time
  }
  let retry = 24;
  let monthChanged: boolean;
  let dayChanged: boolean;
  let hourChanged: boolean;
  while (--retry) {
    date = shiftMonth(arr, date, operation, reset);
    [date, monthChanged] = shiftDay(arr, date, operation, reset);
    if (!monthChanged) {
      [date, dayChanged] = shiftHour(arr, date, operation, reset);
      if (!dayChanged) {
        [date, hourChanged] = shiftMinute(arr, date, operation, reset);
        if (!hourChanged) {
          break;
        }
      }
    }
  }
  if (!retry) {
    throw new Error("Unable to find execution time for schedule");
  }
  return date.set({ second: 0, millisecond: 0 });
};

/**
 * Increments/decrements the month value of a date,
 * until a month that matches the schedule is found
 *
 * @param arr The cron schedule as an array
 * @param date The date to shift
 * @param operation The function to call on date: 'plus' or 'minus'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 */
const shiftMonth = (
  arr: number[][],
  date: DateTime,
  operation: "plus" | "minus",
  reset: "startOf" | "endOf"
) => {
  while (arr[3].indexOf(date.month) === -1) {
    date = date[operation]({ months: 1 })[reset]("month");
  }
  return date;
};

/**
 * Increments/decrements the day value of a date,
 * until a day that matches the schedule is found
 *
 * @param arr The cron schedule as an array
 * @param date The date to shift
 * @param operation The function to call on date: 'plus' or 'minus'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 * @return Whether the month of the date was changed
 */
const shiftDay = (
  arr: number[][],
  date: DateTime,
  operation: "plus" | "minus",
  reset: "startOf" | "endOf"
): [DateTime, boolean] => {
  const currentMonth = date.month;
  while (
    arr[2].indexOf(date.day) === -1 ||
    // luxon uses 1-7 for weekdays, but we use 0-6
    arr[4].indexOf(date.weekday === 7 ? 0 : date.weekday) === -1
  ) {
    date = date[operation]({ days: 1 })[reset]("day");
    if (currentMonth !== date.month) {
      return [date, true];
    }
  }
  return [date, false];
};

/**
 * Increments/decrements the hour value of a date,
 * until an hour that matches the schedule is found
 *
 * @param arr The cron schedule as an array
 * @param date The date to shift
 * @param operation The function to call on date: 'plus' or 'minus'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 * @return Whether the hour of the date was changed
 */
const shiftHour = (
  arr: number[][],
  date: DateTime,
  operation: "plus" | "minus",
  reset: "startOf" | "endOf"
): [DateTime, boolean] => {
  const currentDay = date.day;
  while (arr[1].indexOf(date.hour) === -1) {
    date = date[operation]({ hours: 1 })[reset]("hour");
    if (currentDay !== date.day) {
      return [date, true];
    }
  }
  return [date, false];
};

/**
 * Increments/decrements the minute value of a date,
 * until an minute that matches the schedule is found
 *
 * @param arr The cron schedule as an array.
 * @param date The date to shift.
 * @param operation The function to call on date: 'plus' or 'minus'
 * @param reset The function to call on date: 'startOf' or 'endOf'
 * @return Whether the minute of the date was changed
 */
const shiftMinute = (
  arr: number[][],
  date: DateTime,
  operation: "plus" | "minus",
  reset: "startOf" | "endOf"
): [DateTime, boolean] => {
  const currentHour = date.hour;
  while (arr[0].indexOf(date.minute) === -1) {
    date = date[operation]({ minutes: 1 })[reset]("minute");
    if (currentHour !== date.hour) {
      return [date, true];
    }
  }
  return [date, false];
};
