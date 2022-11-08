import { Cron, getSchedule } from "../src/cron";
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
      const cron = new Cron();
      cron.fromString(schedule.string);
      expect(() => getSchedule(cron).next()).to.throw(schedule.error);
    });
  });

  it("on invalid date", function () {
    const cron = new Cron();
    cron.fromString("* * * * *");
    expect(() => getSchedule(cron, NaN as any)).to.throw("Invalid date provided");
  });
});
