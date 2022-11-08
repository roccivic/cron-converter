import { expect } from "chai";
import { arrayToString, stringToArray } from "../src/cron";

describe("Should output hashes", function () {
  it("for full ranges", function () {
    const parts = stringToArray("* * * 1-3 1-5");
    expect(
      arrayToString(parts, {
        outputHashes: true,
      })
    ).to.equal("H H H 1-3 1-5");
  });
  it("for full intervals and range intervals", function () {
    const parts = stringToArray("*/5 1-20/5 3,6,9/3 1-3 1-5");
    expect(
      arrayToString(parts, {
        outputHashes: true,
      })
    ).to.equal("H/5 H(1-16)/5 H(3-9)/3 1-3 1-5");
  });
  it("for readme", function () {
    const parts = stringToArray("*/5 9-17/2 * 1-3 1-5");
    expect(
      arrayToString(parts, {
        outputHashes: true,
        outputMonthNames: true,
        outputWeekdayNames: true,
      })
    ).to.equal("H/5 H(9-17)/2 H JAN-MAR MON-FRI");
  });
});
