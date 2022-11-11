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
