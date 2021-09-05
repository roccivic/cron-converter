import Cron from "../src/cron";
import { expect } from "chai";

const schedules = [
  {
    schedule: "* * * * *",
    prev: "2013-02-08T09:31:00.000Z",
    now: "2013-02-08T09:32:00.000Z",
    next: "2013-02-08T09:32:00.000Z",
  },
  {
    schedule: "* * * * *",
    prev: "2013-02-08T09:32:00.000Z",
    now: "2013-02-08T09:32:15.000Z",
    next: "2013-02-08T09:33:00.000Z",
  },
  {
    schedule: "*/5 * * * *",
    prev: "2013-02-08T09:30:00.000Z",
    now: "2013-02-08T09:32:15.000Z",
    next: "2013-02-08T09:35:00.000Z",
  },
  {
    schedule: "30 1 * * *",
    prev: "2013-02-08T01:30:00.000Z",
    now: "2013-02-08T09:32:15.000Z",
    next: "2013-02-09T01:30:00.000Z",
  },
  {
    schedule: "30 1 1 * *",
    prev: "2013-02-01T01:30:00.000Z",
    now: "2013-02-08T09:32:00.000Z",
    next: "2013-03-01T01:30:00.000Z",
  },
  {
    schedule: "30 1 * 1 *",
    prev: "2013-01-31T01:30:00.000Z",
    now: "2013-02-08T09:32:00.000Z",
    next: "2014-01-01T01:30:00.000Z",
  },
  {
    schedule: "30 1 1 1 *",
    prev: "2013-01-01T01:30:00.000Z",
    now: "2013-02-08T09:32:00.000Z",
    next: "2014-01-01T01:30:00.000Z",
  },
  {
    schedule: "30 1 * * SAT",
    prev: "2013-02-02T01:30:00.000Z",
    now: "2013-02-08T09:32:00.000Z",
    next: "2013-02-09T01:30:00.000Z",
  },
  {
    schedule: "30 1 * * MON-FRI",
    prev: "2013-02-08T01:30:00.000Z",
    now: "2013-02-08T09:32:00.000Z",
    next: "2013-02-11T01:30:00.000Z",
  },
  {
    schedule: "1-30/10 * * * MON-FRI",
    prev: "2013-02-08T09:21:00.000Z",
    now: "2013-02-08T09:32:00.000Z",
    next: "2013-02-08T10:01:00.000Z",
  },
  {
    schedule: "* * * * MON-FRI",
    prev: "2013-02-07T23:59:00.000Z",
    now: "2013-02-08T00:00:00.000Z",
    next: "2013-02-08T00:00:00.000Z",
  },
  {
    schedule: "*/10 * * * MON-FRI",
    prev: "2013-02-08T09:20:00.000Z",
    now: "2013-02-08T09:30:00.000Z",
    next: "2013-02-08T09:30:00.000Z",
  },
  {
    schedule: "* 6 * * 1-1",
    prev: "2013-02-04T06:59:00.000Z",
    now: "2013-02-08T09:32:15.000Z",
    next: "2013-02-11T06:00:00.000Z",
  },
];
describe("Should output execution time for valid schedule", function () {
  schedules.forEach(function (s) {
    const cron = new Cron({
      timezone: "Europe/London",
    });
    cron.fromString(s.schedule);
    const schedule = cron.schedule(s.now);
    it("should find next schedule for " + s.schedule, function () {
      expect(schedule.next().toJSON()).to.equal(s.next);
      schedule.reset();
    });
    it("should find prev schedule for " + s.schedule, function () {
      expect(schedule.prev().toJSON()).to.equal(s.prev);
    });
  });
});

describe("Should output execution time for valid schedule twice", function () {
  const cron = new Cron();
  cron.fromString("*/5 * * * *");
  const schedule = cron.schedule("2013-02-08T09:32:15.000Z");
  it("should find schedule for " + schedule, function () {
    expect(schedule.next().toJSON()).to.equal("2013-02-08T09:35:00.000Z");
    expect(schedule.next().toJSON()).to.equal("2013-02-08T09:40:00.000Z");
  });
});
