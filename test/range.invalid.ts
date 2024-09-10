import { stringToArrayPart } from "../src/part.js";
import { expect } from "chai";
import { units } from "../src/units.js";

const invalidRanges = [
  {
    unit: units[0],
    input: "",
    error: 'Invalid value "" for minute',
  },
  {
    unit: units[1],
    input: "33-1",
    error: 'Max range is less than min range in "33-1" for hour',
  },
  {
    unit: units[1],
    input: "1-2-3",
    error: 'Invalid value "1-2-3" for hour',
  },
  {
    unit: units[2],
    input: "5-35",
    error: 'Value "35" out of range for day',
  },
  {
    unit: units[2],
    input: "**",
    error: 'Invalid value "**" for day',
  },
  {
    unit: units[3],
    input: "0-",
    error: 'Invalid value "0-" for month',
  },
  {
    unit: units[0],
    input: "1a",
    error: 'Invalid value "1a" for minute',
  },
  {
    unit: units[0],
    input: "1a-2",
    error: 'Invalid value "1a-2" for minute',
  },
  {
    unit: units[0],
    input: "1-2b",
    error: 'Invalid value "1-2b" for minute',
  },
  {
    unit: units[0],
    input: "*/2b",
    error: 'Invalid interval step value "2b" for minute',
  },
];
describe("Should throw on invalid range string", function () {
  invalidRanges.forEach(function (invalidRange) {
    it(invalidRange.input, function () {
      expect(() =>
        stringToArrayPart(invalidRange.input, invalidRange.unit, {enableLastDayOfMonth: true})
      ).to.throw(invalidRange.error);
    });
  });
});
