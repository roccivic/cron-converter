import { arrayToStringPart, stringToArrayPart } from "./part";
import { assertValidArray } from "./util";
import { Options } from "./types";
import { Schedule } from "./schedule";
import { units } from "./units";

const defaultOptions: Options = {
  outputHashes: false,
  outputMonthNames: false,
  outputWeekdayNames: false,
};

/**
 * Parses a cron string
 *
 * @param str The string to parse
 * @return The cron schedule as an array
 */
export const stringToArray = (str: string) => {
  if (typeof str !== "string") {
    throw new Error("Invalid cron string");
  }
  const parts = str.replace(/\s+/g, " ").trim().split(" ");
  if (parts.length !== 5) {
    throw new Error("Invalid cron string format");
  } else {
    return parts.map((str, idx) => stringToArrayPart(str, units[idx]));
  }
};

/**
 * Parses a 2-dimentional array of integers and serializes it to a string
 *
 * @param arr The array to parse
 * @return The cron schedule as a string
 */
export const arrayToString = (arr: number[][], options?: Partial<Options>) => {
  assertValidArray(arr);
  const parts = arr.map((part, idx) =>
    arrayToStringPart(part, units[idx], { ...defaultOptions, ...options })
  );
  return parts.join(" ");
};

/**
 * Returns the schedule iterator
 *
 * @param arr The cron schedule as an array
 * @param now An optional reference `Date`
 * @param timezone An optional timezone string
 * @return A schedule iterator
 */
export const getSchedule = (
  arr: number[][],
  now?: Date | string,
  timezone?: string
) => new Schedule(arr, now, timezone);
