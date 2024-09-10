import { expect } from "chai";
import { arrayToString, stringToArray } from "../src/index.js";

const validCron = [
  {
    in: "0 0 1 JAN SUN",
    out: "0 0 1 1 0",
  },
  {
    in: " 0  0   1    JAN     SUN ",
    out: "0 0 1 1 0",
  },
  {
    in: "0 0 1 1 0",
    out: "0 0 1 1 0",
  },
  {
    in: "59 23 31 12 6",
    out: "59 23 31 12 6",
  },
  {
    in: "59 23 31 DEC SAT",
    out: "59 23 31 12 6",
  },
  {
    in: "0-59 0-23 1-31 1-12 0-6",
    out: "* * * * *",
  },
  {
    in: "0-59 0-23 1-31 1-12 1-7",
    out: "* * * * *",
  },
  {
    in: "0-59 0-23 1-31 1-12 5-7",
    out: "* * * * 0,5-6",
  },
  {
    in: "0-59 0-23 1-31 JAN-DEC SUN-SAT",
    out: "* * * * *",
  },
  {
    in: "*/5 0-5/10 1-31 JAN-DEC SUN-SAT",
    out: "*/5 0 * * *",
  },
  {
    in: "*/5 0,5 1-31 JAN-DEC SUN-SAT",
    out: "*/5 0,5 * * *",
  },
  {
    in: "* 2-10,19-23/2 * * *",
    out: "* 2-10,19,21,23 * * *",
  },
  {
    in: "* 2-6/2,19-23/2 * * *",
    out: "* 2,4,6,19,21,23 * * *",
  },
  {
    in: "* 2-6/2,19-23/2 L * *",
    out: "* 2,4,6,19,21,23 L * *",
  },
];

describe("Should parse valid cron string", function () {
  validCron.forEach(function (valid) {
    it(valid.in, function () {
      expect(arrayToString(stringToArray(valid.in))).to.equal(valid.out);
    });
  });
});
