"use strict";

import { Part } from "./part";
import { Seeker } from "./seeker";
import { Options } from "./types";
import { units } from "./units";

const defaultOptions: Options = {
  outputHashes: false,
  outputMonthNames: false,
  outputWeekdayNames: false,
};

const getOptions = (options?: Partial<Options>) => {
  if (options) {
    return { ...defaultOptions, ...options };
  } else {
    return defaultOptions;
  }
};

/**
 * Parses a cron string.
 * @param str The string to parse.
 */
export const fromString = (str: string, options?: Partial<Options>) => {
  if (typeof str !== "string") {
    throw new Error("Invalid cron string");
  }
  const parts = str.replace(/\s+/g, " ").trim().split(" ");
  if (parts.length === 5) {
    return parts.map((str, idx) => {
      const part = new Part(units[idx], getOptions(options));
      part.fromString(str);
      return part;
    });
  } else {
    throw new Error("Invalid cron string format");
  }
};

/**
 * Returns the cron schedule as a string.
 *
 * @return The cron schedule as a string.
 */
export const toString = (parts: Part[]) => {
  if (parts === undefined) {
    throw new Error("No schedule found");
  }
  return parts.join(" ");
};

/**
 * Parses a 2-dimentional array of integers as a cron schedule.
 *
 * @param cronArr The array to parse.
 */
export const fromArray = (cronArr: number[][], options?: Partial<Options>) => {
  if (cronArr.length === 5) {
    return cronArr.map((partArr, idx) => {
      const part = new Part(units[idx], getOptions(options));
      part.fromArray(partArr);
      return part;
    });
  } else {
    throw new Error("Invalid cron array");
  }
};

/**
 * Returns the cron schedule as
 * a 2-dimentional array of integers.
 *
 * @return The cron schedule as an array.
 */
export const toArray = (parts: Part[]) => {
  if (parts === undefined) {
    throw new Error("No schedule found");
  }
  return parts.map((part) => part.toArray());
};

/**
 * Returns the schedule iterator.
 *
 * @param now A Date object
 * @return A schedule iterator.
 */
export const getSchedule = (
  cron: Part[],
  now?: Date | string,
  timezone?: string
) => {
  return new Seeker(cron, now, timezone);
};
