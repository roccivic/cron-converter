import { getSchedule, stringToArray } from "../src/index.js";
import { expect } from "chai";

const schedules = [
  {
    string: "* * 30 FEB *",
    error: "Unable to find execution time for schedule",
  },
];
describe("Should throw", function () {
  schedules.forEach(function (schedule) {
    it("on invalid schedule " + schedule.string, function () {
      const parts = stringToArray(schedule.string);
      expect(() => getSchedule(parts).next()).to.throw(schedule.error);
    });
  });

  it("on invalid date", function () {
    const parts = stringToArray("* * * * *");
    expect(() => getSchedule(parts, NaN as any)).to.throw(
      "Invalid reference date provided"
    );
  });

  it("on invalid timezone", function () {
    const parts = stringToArray("* * * * *");
    expect(() => getSchedule(parts, new Date(), "Invalid/Invalid")).to.throw(
      "Invalid timezone provided"
    );
  });

  it("enableLastDayOfMonth disabled", function () {
    expect(() => stringToArray("* * L * *", {enableLastDayOfMonth: false})).to.throw(
      "Invalid value \"L\" for day"
    );
  });
});
