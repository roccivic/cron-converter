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
 * @return The cron schedule as an array.
 */
export const stringToArray = (str: string) => {
  if (typeof str !== "string") {
    throw new Error("Invalid cron string");
  }
  const parts = str.replace(/\s+/g, " ").trim().split(" ");
  if (parts.length !== 5) {
    throw new Error("Invalid cron string format");
  } else {
    const parsed = parts.map((str, idx) => {
      const part = new Part(units[idx]);
      part.fromString(str);
      return part;
    });
    return parsed.map((part) => part.toArray());
  }
};

/**
 * Parses a 2-dimentional array of integers and serializes it to a string.
 *
 * @param arr The array to parse.
 * @return The cron schedule as a string.
 */
export const arrayToString = (arr: number[][], options?: Partial<Options>) => {
  if (arr === undefined || !Array.isArray(arr) || arr.length !== 5) {
    throw new Error("Invalid cron array");
  }
  const parts = arr.map((partArr, idx) => {
    const part = new Part(units[idx], getOptions(options));
    part.fromArray(partArr);
    return part;
  });
  return parts.join(" ");
};

/**
 * Returns the schedule iterator
 *
 * @param parts The cron schedule as an array
 * @param now An optional reference `Date`
 * @param timezone An optional timezone string
 * @return A schedule iterator
 */
export const getSchedule = (
  parts: number[][],
  now?: Date | string,
  timezone?: string
) => new Seeker(parts, now, timezone);
