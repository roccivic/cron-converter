import Part from "../src/part";
import { expect } from "chai";

const invalidRanges = [
  {
    input: "",
    min: 1,
    max: 10,
    error: 'Invalid value "" for sample unit',
    name: "sample unit",
  },
  {
    input: "3-1",
    min: 1,
    max: 2,
    error: 'Max range is less than min range in "3-1" for sample unit',
    name: "sample unit",
  },
  {
    input: "1-2-3",
    min: 1,
    max: 10,
    error: 'Invalid value "1-2-3" for sample unit',
    name: "sample unit",
  },
  {
    input: "5-15",
    min: 10,
    max: 20,
    error: 'Value "5" out of range for sample unit',
    name: "sample unit",
  },
  {
    input: "**",
    min: 1,
    max: 10,
    error: 'Invalid value "**" for sample unit',
    name: "sample unit",
  },
  {
    input: "0-",
    min: 0,
    max: 10,
    error: 'Empty interval value "0-" for sample unit',
    name: "sample unit",
  },
];
describe("Should throw on invalid range string", function () {
  invalidRanges.forEach(function (invalidRange) {
    it(invalidRange.input, function () {
      expect(() =>
        new Part(invalidRange).fromString(invalidRange.input)
      ).to.throw(invalidRange.error);
    });
  });
});
