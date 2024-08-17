import { getSchedule, stringToArray } from "../src/index.js";
import { expect } from "chai";

const schedules = [
  {
    schedule: "* * * * *",
    now: "2013-02-08T09:32:00.000Z",
    prev: "2013-02-08T04:31:00.000-05:00",
    next: "2013-02-08T04:32:00.000-05:00",
    timezone: "America/New_York",
  },
  {
    schedule: "* * * * *",
    now: "2013-02-08T09:32:15.000+00:00",
    prev: "2013-02-08T04:32:00.000-05:00",
    next: "2013-02-08T04:33:00.000-05:00",
    timezone: "America/New_York",
  },
  {
    schedule: "*/5 * * * *",
    now: "2013-02-08T09:32:15.000Z",
    prev: "2013-02-08T18:30:00.000+09:00",
    next: "2013-02-08T18:35:00.000+09:00",
    timezone: "Asia/Tokyo",
  },
  {
    schedule: "30 1 * * *",
    now: "2013-02-08T19:32:15.000Z",
    prev: "2013-02-09T01:30:00.000+09:00",
    next: "2013-02-10T01:30:00.000+09:00",
    timezone: "Asia/Tokyo",
  },
  {
    schedule: "30 1 1 * *",
    now: "2013-02-08T09:32:00.000Z",
    prev: "2013-02-01T01:30:00.000Z",
    next: "2013-03-01T01:30:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "30 1 * 1 *",
    now: "2013-02-08T09:32:00.000Z",
    prev: "2013-01-31T01:30:00.000Z",
    next: "2014-01-01T01:30:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "30 1 1 1 *",
    now: "2013-02-08T09:32:00.000Z",
    prev: "2013-01-01T01:30:00.000Z",
    next: "2014-01-01T01:30:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "30 1 * * SAT",
    now: "2013-02-08T09:32:00.000Z",
    prev: "2013-02-02T01:30:00.000Z",
    next: "2013-02-09T01:30:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "30 1 * * MON-FRI",
    now: "2013-02-08T09:32:00.000Z",
    prev: "2013-02-08T01:30:00.000+01:00",
    next: "2013-02-11T01:30:00.000+01:00",
    timezone: "Africa/Tunis",
  },
  {
    schedule: "1-30/10 * * * MON-FRI",
    now: "2013-02-08T09:32:00.000Z",
    prev: "2013-02-08T10:21:00.000+01:00",
    next: "2013-02-08T11:01:00.000+01:00",
    timezone: "Africa/Tunis",
  },
  {
    schedule: "* * * * MON-FRI",
    now: "2013-02-08T00:00:00.000Z",
    prev: "2013-02-08T00:59:00.000+01:00",
    next: "2013-02-08T01:00:00.000+01:00",
    timezone: "Africa/Tunis",
  },
  {
    schedule: "* * * * MON-FRI",
    now: "2013-02-09T00:00:00.000Z",
    prev: "2013-02-08T23:59:00.000+01:00",
    next: "2013-02-11T00:00:00.000+01:00",
    timezone: "Africa/Tunis",
  },
  {
    schedule: "*/10 * * * MON-FRI",
    now: "2013-02-08T09:30:00.000Z",
    prev: "2013-02-08T09:20:00.000Z",
    next: "2013-02-08T09:30:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "* 6 * * 1-1",
    now: "2013-02-08T09:32:15.000Z",
    prev: "2013-02-04T06:59:00.000Z",
    next: "2013-02-11T06:00:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "55 23 -1 * *",
    now: "2024-02-08T09:32:15.000Z",
    prev: "2024-01-31T23:55:00.000Z",
    next: "2024-02-29T23:55:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "55 23 -1 * *",
    now: "2023-02-08T09:32:15.000Z",
    prev: "2023-01-31T23:55:00.000Z",
    next: "2023-02-28T23:55:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "55 23 -1 * *",
    now: "2023-01-08T09:32:15.000Z",
    prev: "2022-12-31T23:55:00.000Z",
    next: "2023-01-31T23:55:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "55 23 -1 * *",
    now: "2023-04-30T09:32:15.000Z",
    prev: "2023-03-31T23:55:00.000Z",
    next: "2023-04-30T23:55:00.000Z",
    timezone: "utc",
  },
  {
    schedule: "55 23 -2 * *",
    now: "2023-04-30T09:32:15.000Z",
    prev: "2023-04-29T23:55:00.000Z",
    next: "2023-05-30T23:55:00.000Z",
    timezone: "utc",
  }
];
describe("Should output execution time for valid schedule", function () {
  schedules.forEach(function (s) {
    const parts = stringToArray(s.schedule);
    const schedule = getSchedule(parts, s.now, s.timezone);
    it(`should find next schedule for ${s.schedule} in ${s.timezone}`, function () {
      expect(schedule.next().toJSON()).to.equal(s.next);
      schedule.reset();
    });
    it(`should find prev schedule for ${s.schedule} in ${s.timezone}`, function () {
      expect(schedule.prev().toJSON()).to.equal(s.prev);
    });
  });
});

describe("Should output execution time for valid schedule twice", function () {
  const expression = "*/5 * * * *";
  const parts = stringToArray(expression);
  const schedule = getSchedule(parts, "2013-02-08T09:32:15.000Z", "utc");
  it(`should find schedule for '${expression}'`, function () {
    expect(schedule.next().toJSON()).to.equal("2013-02-08T09:35:00.000Z");
    expect(schedule.next().toJSON()).to.equal("2013-02-08T09:40:00.000Z");
  });
});
