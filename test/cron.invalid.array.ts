import { expect } from "chai";
import { fromArray } from "../src/cron";

const invalidCron = [
  {
    array: [],
    error: "Invalid cron array",
  },
  {
    array: [[], [], [], [], []],
    error: "Empty interval value for minute",
  },
  {
    array: [["a"], [1], [1], [1], [1]] as number[][],
    error: 'Invalid value "a" for minute',
  },
  {
    array: [[0], [0], [0], [0], [0]],
    error: 'Value "0" out of range for day',
  },
];

describe("Should throw on invalid cron array", function () {
  invalidCron.forEach(function (invalid) {
    it(invalid.array.toString(), function () {
      expect(() => fromArray(invalid.array)).to.throw(invalid.error);
    });
  });
});
