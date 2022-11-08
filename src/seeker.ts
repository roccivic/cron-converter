"use strict";

import moment, { tz, Moment } from "moment-timezone";
import { Cron } from "./cron";
import { Part } from "./part";

/**
 * Creates an instance of Seeker.
 * Seeker objects search for execution times of a cron schedule.
 */
export class Seeker {
  parts: Part[];
  now: Moment;
  date: Moment;
  pristine: boolean;

  constructor(cron: Cron, now: Date | string) {
    if (cron.parts === undefined) {
      throw new Error("No schedule found");
    }
    let date: Moment;
    if (cron.options.timezone) {
      date = tz(now, cron.options.timezone);
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
    this.parts = cron.parts;
    this.now = date;
    this.date = date;
    this.pristine = true;
  }

  /**
   * Resets the iterator.
   */
  reset() {
    this.pristine = true;
    this.date = moment(this.now);
  }

  /**
   * Returns the time the schedule would run next.
   *
   * @return The time the schedule would run next.
   */
  next() {
    if (this.pristine) {
      this.pristine = false;
    } else {
      this.date.add(1, "minute");
    }
    return this.findDate(this.parts, this.date, false);
  }

  /**
   * Returns the time the schedule would have last run at.
   *
   * @return The time the schedule would have last run at.
   */
  prev() {
    this.pristine = false;
    return this.findDate(this.parts, this.date, true);
  }

  /**
   * Returns the time the schedule would run next.
   *
   * @param parts An array of Cron parts.
   * @param date The reference date.
   * @param reverse Whether to find the previous value instead of next.
   * @return The date the schedule would have executed at.
   */
  findDate(parts: Part[], date: Moment, reverse: boolean) {
    const operation = reverse ? 'subtract' : "add";
    const reset = reverse ? 'endOf' : "startOf";
    if (reverse) {
      date.subtract(1, "minute"); // Ensure prev and next cannot be same time
    }
    let retry = 24;
    while (--retry) {
      this.shiftMonth(parts, date, operation, reset);
      let monthChanged = this.shiftDay(parts, date, operation, reset);
      if (!monthChanged) {
        let dayChanged = this.shiftHour(parts, date, operation, reset);
        if (!dayChanged) {
          let hourChanged = this.shiftMinute(parts, date, operation, reset);
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
  }

  /**
   * Increments/decrements the month value of a date,
   * until a month that matches the schedule is found
   *
   * @param parts An array of Cron parts.
   * @param date The date to shift.
   * @param operation The function to call on date: 'add' or 'subtract'
   * @param reset The function to call on date: 'startOf' or 'endOf'
   */
  shiftMonth(
    parts: Part[],
    date: Moment,
    operation: "add" | "subtract",
    reset: "startOf" | "endOf"
  ) {
    while (!parts[3].has(date.month() + 1)) {
      date[operation](1, "months")[reset]("month");
    }
  }

  /**
   * Increments/decrements the day value of a date,
   * until a day that matches the schedule is found
   *
   * @param parts An array of Cron parts.
   * @param date The date to shift.
   * @param operation The function to call on date: 'add' or 'subtract'
   * @param reset The function to call on date: 'startOf' or 'endOf'
   * @return Whether the month of the date was changed
   */
  shiftDay(
    parts: Part[],
    date: Moment,
    operation: "add" | "subtract",
    reset: "startOf" | "endOf"
  ) {
    const currentMonth = date.month();
    while (!parts[2].has(date.date()) || !parts[4].has(date.day())) {
      date[operation](1, "days")[reset]("day");
      if (currentMonth !== date.month()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Increments/decrements the hour value of a date,
   * until an hour that matches the schedule is found
   *
   * @param parts An array of Cron parts.
   * @param date The date to shift.
   * @param operation The function to call on date: 'add' or 'subtract'
   * @param reset The function to call on date: 'startOf' or 'endOf'
   * @return Whether the hour of the date was changed
   */
  shiftHour(
    parts: Part[],
    date: Moment,
    operation: "add" | "subtract",
    reset: "startOf" | "endOf"
  ) {
    const currentDay = date.date();
    while (!parts[1].has(date.hour())) {
      date[operation](1, "hours")[reset]("hour");
      if (currentDay !== date.date()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Increments/decrements the minute value of a date,
   * until an minute that matches the schedule is found
   *
   * @param parts An array of Cron parts.
   * @param date The date to shift.
   * @param operation The function to call on date: 'add' or 'subtract'
   * @param reset The function to call on date: 'startOf' or 'endOf'
   * @return Whether the minute of the date was changed
   */
  shiftMinute(
    parts: Part[],
    date: Moment,
    operation: "add" | "subtract",
    reset: "startOf" | "endOf"
  ) {
    const currentHour = date.hour();
    while (!parts[0].has(date.minute())) {
      date[operation](1, "minutes")[reset]("minute");
      if (currentHour !== date.hour()) {
        return true;
      }
    }
    return false;
  }
}
