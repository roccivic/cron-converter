import Cron from "../src/cron";
import { expect } from "chai";

describe("output strings", function () {
  it("Should output weekdays as strings", function () {
    const cron = new Cron({
      outputWeekdayNames: true,
    });
    cron.fromString("* * * 1-3 1-5");
    expect(cron.toString()).to.equal("* * * 1-3 MON-FRI");
  });
  it("Should not output weekdays in step", function () {
    const cron = new Cron({
      outputWeekdayNames: true,
    });
    cron.fromString("* * * 1-3 */2");
    expect(cron.toString()).to.equal("* * * 1-3 */2");
  });
  it("Should output month names as strings", function () {
    const cron = new Cron({
      outputMonthNames: true,
    });
    cron.fromString("* * * 1-3 1-5");
    expect(cron.toString()).to.equal("* * * JAN-MAR 1-5");
    cron.fromString("* * * 5-10 1-5");
    expect(cron.toString()).to.equal("* * * MAY-OCT 1-5");
  });
  it("Should not output month names in step", function () {
    const cron = new Cron({
      outputMonthNames: true,
    });
    cron.fromString("* * * */2 1-5");
    expect(cron.toString()).to.equal("* * * */2 1-5");
  });
  it("Should output correct string when min and max range values are the same", function () {
    const cron = new Cron({
      outputWeekdayNames: true,
    });
    cron.fromString("* * * * 1-1");
    expect(cron.toString()).to.equal("* * * * MON");
  });
});
