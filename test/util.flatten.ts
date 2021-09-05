import { flatten } from "../src/util";
import { expect } from "chai";

const arrays = [
  {
    input: [],
    flattened: [],
  },
  {
    input: [[1], [2]],
    flattened: [1, 2],
  },
  {
    input: [
      [1, 5],
      [2, 6],
    ],
    flattened: [1, 5, 2, 6],
  },
];
describe("Should flatten arrays", function () {
  arrays.forEach(function (array) {
    it(`[${array.input}]`, function () {
      expect(flatten(array.input)).to.eql(array.flattened);
    });
  });
});
