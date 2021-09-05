import { dedup } from "../src/util";
import { expect } from "chai";

const arrays = [
  {
    input: [],
    output: [],
  },
  {
    input: [0, 0, 0],
    output: [0],
  },
  {
    input: [1, 1, 1, 2, 3, 4, 5, 6],
    output: [1, 2, 3, 4, 5, 6],
  },
  {
    input: [500, -1, 33, -1, 0, 0, 1, 1, -1],
    output: [500, -1, 33, 0, 1],
  },
];
describe("Should de-dup arrays", function () {
  arrays.forEach(function (array) {
    it(`[${array.input}]`, function () {
      expect(dedup(array.input)).to.eql(array.output);
    });
  });
});
