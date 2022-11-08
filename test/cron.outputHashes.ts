import { expect } from "chai";
import { fromString, toString } from "../src/cron";

describe("Should output hashes", function () {
  it("for full ranges", function () {
    const parts = fromString("* * * 1-3 1-5", {
      outputHashes: true,
    });
    expect(toString(parts)).to.equal("H H H 1-3 1-5");
  });
  it("for full intervals and range intervals", function () {
    const parts = fromString("*/5 1-20/5 3,6,9/3 1-3 1-5", {
      outputHashes: true,
    });
    expect(toString(parts)).to.equal("H/5 H(1-16)/5 H(3-9)/3 1-3 1-5");
  });
  it("for readme", function () {
    const parts = fromString("*/5 9-17/2 * 1-3 1-5", {
      outputHashes: true,
      outputMonthNames: true,
      outputWeekdayNames: true,
    });
    expect(toString(parts)).to.equal("H/5 H(9-17)/2 H JAN-MAR MON-FRI");
  });
});
