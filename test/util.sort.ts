import { sort } from "../src/util";
import { expect } from "chai";

const arrays = [
  {
    input: [],
    sorted: [],
  },
  {
    input: [0, 1],
    sorted: [0, 1],
  },
  {
    input: [1, 0],
    sorted: [0, 1],
  },
  {
    input: [1, 0, 1],
    sorted: [0, 1, 1],
  },
  {
    input: [5, 4, 3, 2, 1],
    sorted: [1, 2, 3, 4, 5],
  },
  {
    input: [42, 9, 17, 54, 602, -3, 54, 999, -11],
    sorted: [-11, -3, 9, 17, 42, 54, 54, 602, 999],
  },
];
describe("Should sort arrays", function () {
  arrays.forEach(function (array) {
    it(`[${array.input}]`, function () {
      expect(sort(array.input)).to.eql(array.sorted);
    });
  });
});
