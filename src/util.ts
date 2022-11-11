/**
 * Parses a value as an integer or returns `undefined`
 * if the value could not be parsed a `number`
 *
 * @param value The integer `number` to parse
 * @returns The parsed integer or `undefined`
 */
export const parseNumber = (value: unknown) => {
  if (typeof value === "string") {
    const str: string = value.trim();
    if (/^\d+$/.test(str)) {
      const num = Number(str);
      if (!isNaN(num) && isFinite(num)) {
        return num;
      }
    }
  } else if (typeof value === "number") {
    if (!isNaN(value) && isFinite(value) && value === Math.floor(value)) {
      return value;
    }
  }
  return undefined;
};

/**
 * Assert that a value is a valid cron array
 *
 * @param arr The array to check
 */
export const assertValidArray = (arr: unknown) => {
  if (
    arr === undefined ||
    !Array.isArray(arr) ||
    arr.length !== 5 ||
    arr.some((element) => !Array.isArray(element))
  ) {
    throw new Error("Invalid cron array");
  }
};

/**
 * Creates an array of integers from start to end, inclusive
 *
 * @param start The first number in the range
 * @param end The last number in the range
 * @return The range, as an array of integers
 */
export const range = (start: number, end: number): number[] => {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
};

/**
 * Sorts an array of numbers
 *
 * @param array The array to sort
 * @return The sorted array
 */
export const sort = (array: number[]) => [...array].sort((a, b) => a - b);

/**
 * Flattens a 2-dimensional array
 *
 * @param arrays A 2-dimensional array
 * @return The flattened array
 */
export const flatten = (arrays: number[][]) =>
  ([] as number[]).concat.apply([], arrays);

/**
 * Removes duplicate entries from an array
 *
 * @param array An array
 * @return The de-duplicated array
 */
export const dedup = (array: number[]) => {
  const result: number[] = [];
  array.forEach((i) => {
    if (result.indexOf(i) < 0) {
      result.push(i);
    }
  });
  return result;
};
