import Cron from "../src/cron";
import { expect } from "chai";

const validCron = [
  {
    in: [[0], [0], [1], [1], [0]],
    out: "0 0 1 1 0",
  },
  {
    in: [[1, 2, 3], [1], [2, 3, 4], [5], [0, 1, 2, 3, 4, 5, 6]],
    out: "1-3 1 2-4 5 *",
  },
  {
    in: [[0], [1], [1], [5], [0, 2, 4, 6]],
    out: "0 1 1 5 */2",
  },
];

describe("Should parse valid cron array", function () {
  validCron.forEach(function (valid) {
    it(valid.in.toString(), function () {
      expect(new Cron().fromArray(valid.in).toString()).to.equal(valid.out);
    });
  });
});
