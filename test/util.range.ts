import { range } from "../src/util";
import { expect } from "chai";

const ranges = [
  {
    start: 5,
    end: 3,
    output: [],
  },
  {
    start: 0,
    end: 0,
    output: [0],
  },
  {
    start: 3,
    end: 5,
    output: [3, 4, 5],
  },
];
describe("Should create range arrays", function () {
  ranges.forEach(function (r) {
    it(`${r.start} to ${r.end}`, function () {
      expect(range(r.start, r.end)).to.eql(r.output);
    });
  });
});
