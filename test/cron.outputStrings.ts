import { expect } from "chai";
import { arrayToString, stringToArray } from "../src/index.js";

describe("output strings", function () {
  it("Should output weekdays as strings", function () {
    const parts = stringToArray("* * * 1-3 1-5");
    expect(arrayToString(parts, { outputWeekdayNames: true })).to.equal(
      "* * * 1-3 MON-FRI"
    );
  });
  it("Should not output weekdays in step", function () {
    const parts = stringToArray("* * * 1-3 */2");
    expect(arrayToString(parts, { outputWeekdayNames: true })).to.equal(
      "* * * 1-3 */2"
    );
  });
  it("Should output month names as strings 1", function () {
    const parts = stringToArray("* * * 1-3 1-5");
    expect(arrayToString(parts, { outputMonthNames: true })).to.equal(
      "* * * JAN-MAR 1-5"
    );
  });
  it("Should output month names as strings 2", function () {
    const parts = stringToArray("* * * 5-10 1-5");
    expect(arrayToString(parts, { outputMonthNames: true })).to.equal(
      "* * * MAY-OCT 1-5"
    );
  });
  it("Should not output month names in step", function () {
    const parts = stringToArray("* * * */2 1-5");
    expect(arrayToString(parts, { outputMonthNames: true })).to.equal(
      "* * * */2 1-5"
    );
  });
  it("Should output correct string when min and max range values are the same", function () {
    const parts = stringToArray("* * * * 1-1");
    expect(arrayToString(parts, { outputWeekdayNames: true })).to.equal(
      "* * * * MON"
    );
  });
});
