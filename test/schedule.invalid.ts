import { getSchedule, stringToArray } from "../src/cron";
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
    expect(() => getSchedule(parts, NaN as any)).to.throw("Invalid date provided");
  });
});
