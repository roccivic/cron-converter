import { expect } from "chai";
import { fromString, toString } from "../src/cron";

describe("output strings", function () {
  it("Should output weekdays as strings", function () {
    const parts = fromString("* * * 1-3 1-5", {
      outputWeekdayNames: true,
    });
    expect(toString(parts)).to.equal("* * * 1-3 MON-FRI");
  });
  it("Should not output weekdays in step", function () {
    const parts = fromString("* * * 1-3 */2", {
      outputWeekdayNames: true,
    });
    expect(toString(parts)).to.equal("* * * 1-3 */2");
  });
  it("Should output month names as strings 1", function () {
    const parts = fromString("* * * 1-3 1-5", {
      outputMonthNames: true,
    });
    expect(toString(parts)).to.equal("* * * JAN-MAR 1-5");
  });
  it("Should output month names as strings 2", function () {
    const parts = fromString("* * * 5-10 1-5", {
      outputMonthNames: true,
    });
    expect(toString(parts)).to.equal("* * * MAY-OCT 1-5");
  });
  it("Should not output month names in step", function () {
    const parts = fromString("* * * */2 1-5", {
      outputMonthNames: true,
    });
    expect(toString(parts)).to.equal("* * * */2 1-5");
  });
  it("Should output correct string when min and max range values are the same", function () {
    const parts = fromString("* * * * 1-1", {
      outputWeekdayNames: true,
    });
    expect(toString(parts)).to.equal("* * * * MON");
  });
});
