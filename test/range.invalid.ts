import { Part } from "../src/part";
import { expect } from "chai";
import { units } from "../src/units";

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
    error: 'Empty interval value "0-" for month',
  },
];
describe("Should throw on invalid range string", function () {
  invalidRanges.forEach(function (invalidRange) {
    it(invalidRange.input, function () {
      expect(() =>
        new Part(invalidRange.unit).fromString(invalidRange.input)
      ).to.throw(invalidRange.error);
    });
  });
});
