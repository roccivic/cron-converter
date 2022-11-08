"use strict";

import { Part } from "./part";
import { Seeker } from "./seeker";
import { Options } from "./types";
import { units } from "./units";

const defaultOptions: Options = {
  outputHashes: false,
  outputMonthNames: false,
  outputWeekdayNames: false,
  timezone: "",
};

export class Cron {
  options: Options;
  parts?: Part[];
  /**
   * Creates an instance of Cron.
   * Cron objects each represent a cron schedule.
   *
   * @param options The options to use
   */
  constructor(options?: Partial<Options>) {
    if (options) {
      this.options = { ...defaultOptions, ...options };
    } else {
      this.options = defaultOptions;
    }
    this.parts = undefined;
  }

  /**
   * Parses a cron string.
   * @param str The string to parse.
   */
  fromString(str: string) {
    if (typeof str !== "string") {
      throw new Error("Invalid cron string");
    }
    const parts = str.replace(/\s+/g, " ").trim().split(" ");
    if (parts.length === 5) {
      this.parts = parts.map((str, idx) => {
        const part = new Part(units[idx], this.options);
        part.fromString(str);
        return part;
      });
    } else {
      throw new Error("Invalid cron string format");
    }
    return this;
  }

  /**
   * Returns the cron schedule as a string.
   *
   * @return The cron schedule as a string.
   */
  toString() {
    if (this.parts === undefined) {
      throw new Error("No schedule found");
    }
    return this.parts.join(" ");
  }

  /**
   * Parses a 2-dimentional array of integers as a cron schedule.
   *
   * @param cronArr The array to parse.
   */
  fromArray(cronArr: number[][]) {
    if (cronArr.length === 5) {
      this.parts = cronArr.map((partArr, idx) => {
        const part = new Part(units[idx]);
        part.fromArray(partArr);
        return part;
      });
    } else {
      throw new Error("Invalid cron array");
    }
    return this;
  }

  /**
   * Returns the cron schedule as
   * a 2-dimentional array of integers.
   *
   * @return The cron schedule as an array.
   */
  toArray() {
    if (this.parts === undefined) {
      throw new Error("No schedule found");
    }
    return this.parts.map((part) => part.toArray());
  }

  /**
   * Returns the time the schedule would run next.
   *
   * @param now A Date object
   * @return A schedule iterator.
   */
  schedule(now: Date | string) {
    return new Seeker(this, now);
  }
}
