"use strict";

import { Options, Unit } from "./types";
import { dedup, flatten, range, sort } from "./util";

export class Part {
  options: Options;
  unit: Unit;
  values: number[];

  /**
   * Creates an instance of Part.
   * Part objects represent a collection of positive integers.
   *
   * @constructor
   * @param unit The unit of measurement of time (see units.ts).
   * @param options The options to use
   */
  constructor(unit: Unit, options?: Options) {
    if (options) {
      this.options = options;
    } else {
      this.options = {
        outputHashes: false,
        outputMonthNames: false,
        outputWeekdayNames: false,
      };
    }
    this.unit = unit;
    this.values = [];
  }

  /**
   * Creates an error.
   * Appends the unit name to the message.
   *
   * @param error The error message.
   */
  error(error: string) {
    return new Error(`${error} for ${this.unit.name}`);
  }

  /**
   * Validates a range of positive integers.
   *
   * @param arr An array of positive integers.
   */
  fromArray(arr: number[]) {
    const values = sort(
      dedup(
        this.fixSunday(
          arr.map((value) => {
            const parsedValue = Number(value);
            if (isNaN(parsedValue) || !isFinite(parsedValue)) {
              throw this.error(`Invalid value "${value}"`);
            }
            return parsedValue;
          })
        )
      )
    );
    if (!values.length) {
      throw this.error("Empty interval value");
    }
    const value = this.outOfRange(values);
    if (typeof value !== "undefined") {
      throw this.error(`Value "${value}" out of range`);
    }
    this.values = values;
  }

  /**
   * Parses a string as a range of positive integers.
   *
   * @param str The string to be parsed as a range.
   */
  fromString(str: string) {
    const values = sort(
      dedup(
        this.fixSunday(
          flatten(
            this.replaceAlternatives(str)
              .split(",")
              .map((value: string) => {
                const valueParts = value.split("/");
                if (valueParts.length > 2) {
                  throw this.error(`Invalid value "${str}"`);
                }
                let parsedValues: number[];
                const left = valueParts[0];
                const right = valueParts[1];
                if (left === "*") {
                  parsedValues = range(this.unit.min, this.unit.max);
                } else {
                  parsedValues = this.parseRange(left, str);
                }
                const step = this.parseStep(right);
                const intervalValues = this.applyInterval(parsedValues, step);
                if (!intervalValues.length) {
                  throw this.error(`Empty interval value "${str}"`);
                }
                return intervalValues;
              })
          )
        )
      )
    );
    const value = this.outOfRange(values);
    if (typeof value !== "undefined") {
      throw this.error(`Value "${value}" out of range`);
    }
    this.values = values;
  }

  /**
   * Replace all 7 with 0 as Sunday can
   * be represented by both.
   *
   * @param values The values to process.
   * @return The resulting array.
   */
  fixSunday(values: number[]) {
    if (this.unit.name === "weekday") {
      values = values.map((value) => {
        if (value === 7) {
          return 0;
        }
        return value;
      });
    }
    return values;
  }

  /**
   * Parses a range string
   *
   * @param range The range string.
   * @param context The operation context string.
   * @return The resulting array.
   */
  parseRange(rangeString: string, context: string) {
    const subparts = rangeString.split("-");
    if (subparts.length === 1) {
      const value = parseInt(subparts[0], 10);
      if (isNaN(value)) {
        throw this.error(`Invalid value "${context}"`);
      }
      return [value];
    } else if (subparts.length === 2) {
      const minValue = parseInt(subparts[0], 10);
      const maxValue = parseInt(subparts[1], 10);
      if (maxValue < minValue) {
        throw this.error(
          `Max range is less than min range in "${rangeString}"`
        );
      }
      return range(minValue, maxValue);
    } else {
      throw this.error(`Invalid value "${rangeString}"`);
    }
  }

  /**
   * Parses the step from a part string
   *
   * @param step The step string.
   * @return The step value.
   */
  parseStep(step: string) {
    if (typeof step !== "undefined") {
      const parsedStep = parseInt(step, 10);
      if (isNaN(parsedStep) || parsedStep < 1) {
        throw this.error(`Invalid interval step value "${step}"`);
      }
      return parsedStep;
    }
    return 0;
  }

  /**
   * Applies an interval step to a collection of values
   *
   * @param values A collection of numbers.
   * @param step The step value.
   * @return The resulting collection.
   */
  applyInterval(values: number[], step: number) {
    if (step) {
      const minVal = values[0];
      values = values.filter(
        (value) => value % step === minVal % step || value === minVal
      );
    }
    return values;
  }

  /**
   * Replaces the alternative representations of numbers in a string
   *
   * @param str The string to process.
   * @return The processed string.
   */
  replaceAlternatives(str: string) {
    if (this.unit.alt) {
      str = str.toUpperCase();
      for (let i = 0; i < this.unit.alt.length; i++) {
        str = str.replace(this.unit.alt[i], String(i + this.unit.min));
      }
    }
    return str;
  }

  /**
   * Finds an element from values that is outside of the range of this.unit
   *
   * @param values The values to test.
   * @return An integer is a value out of range was found,
   *                otherwise undefined.
   */
  outOfRange(values: number[]) {
    const first = values[0];
    const last = values[values.length - 1];
    if (first < this.unit.min) {
      return first;
    } else if (last > this.unit.max) {
      return last;
    }
    return undefined;
  }

  /**
   * Returns the smallest value in the range.
   *
   * @return The smallest value.
   */
  min() {
    return this.values[0];
  }

  /**
   * Returns the largest value in the range.
   *
   * @return The largest value.
   */
  max() {
    return this.values[this.values.length - 1];
  }

  /**
   * Returns true if range has all the values of the unit.
   *
   * @return true/false.
   */
  isFull() {
    return this.values.length === this.unit.max - this.unit.min + 1;
  }

  /**
   * Returns the difference between first and second elements in the range.
   *
   * @return The size of the step.
   */
  getStep() {
    if (this.values.length > 2) {
      const step = this.values[1] - this.values[0];
      if (step > 1) {
        return step;
      }
    }
    return 0;
  }

  /**
   * Returns true if the range can be represented as an interval.
   *
   * @param step The difference between numbers in the interval.
   * @return true/false.
   */
  isInterval(step: number) {
    for (let i = 1; i < this.values.length; i++) {
      const prev = this.values[i - 1];
      const value = this.values[i];
      if (value - prev !== step) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if the range contains all the interval values.
   *
   * @param step The difference between numbers in the interval.
   * @return true/false.
   */
  isFullInterval(step: number) {
    const unit = this.unit;
    const min = this.min();
    const max = this.max();
    const haveAllValues = this.values.length === (max - min) / step + 1;
    if (min === unit.min && max + step > unit.max && haveAllValues) {
      return true;
    }
    return false;
  }

  /**
   * Checks if the range contains the specified value
   *
   * @param value The value to look for.
   * @return Whether the value is present in the range.
   */
  has(value: number) {
    return this.values.indexOf(value) > -1;
  }

  /**
   * Returns the range as an array of positive integers.
   *
   * @return The range as an array.
   */
  toArray() {
    return this.values;
  }

  /**
   * Returns the range as an array of ranges
   * defined as arrays of positive integers.
   *
   * @return The range as a multi-dimentional array.
   */
  toRanges() {
    const retval: number[][] = [];
    let startPart: number | undefined = undefined;
    this.values.forEach(function (value, index, self) {
      if (value !== self[index + 1] - 1) {
        if (startPart !== undefined) {
          retval.push([startPart, value]);
          startPart = undefined;
        } else {
          retval.push([value]);
        }
      } else if (startPart === undefined) {
        startPart = value;
      }
    });
    return retval;
  }

  /**
   * Returns the range as a string.
   *
   * @return The range as a string.
   */
  toString() {
    let retval = "";
    if (this.isFull()) {
      if (this.options.outputHashes) {
        retval = "H";
      } else {
        retval = "*";
      }
    } else {
      const step = this.getStep();
      if (step && this.isInterval(step)) {
        if (this.isFullInterval(step)) {
          if (this.options.outputHashes) {
            retval = `H/${step}`;
          } else {
            retval = `*/${step}`;
          }
        } else {
          const range =
            this.formatValue(this.min()) + "-" + this.formatValue(this.max());
          if (this.options.outputHashes) {
            retval = `H(${range})/${step}`;
          } else {
            retval = `${range}/${step}`;
          }
        }
      } else {
        retval = this.toRanges()
          .map((range) => {
            if (range.length === 1) {
              return this.formatValue(range[0]);
            } else {
              return (
                this.formatValue(range[0]) + "-" + this.formatValue(range[1])
              );
            }
          })
          .join(",");
      }
    }
    return retval;
  }

  /**
   * Formats weekday and month names as string
   * when the relevant options are set.
   *
   * @param value The value to process.
   * @return The formatted string or number.
   */
  formatValue(value: number) {
    if (
      (this.options.outputWeekdayNames && this.unit.name === "weekday") ||
      (this.options.outputMonthNames && this.unit.name === "month")
    ) {
      if (this.unit.alt) {
        return this.unit.alt[value - this.unit.min];
      }
    }
    return value;
  }
}
