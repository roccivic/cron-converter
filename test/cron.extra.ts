import Cron from "../src/cron";
import { expect } from "chai";

describe("Should throw when uninstanciated", function () {
  const cron = new Cron();
  it("on toString", function () {
    expect(() => cron.toString()).to.throw("No schedule found");
  });
  it("on toArray", function () {
    expect(() => cron.toArray()).to.throw("No schedule found");
  });
  it("on schedule", function () {
    expect(() => cron.schedule()).to.throw("No schedule found");
  });
});
describe("Result of toArray should not affect object", function () {
  it("on change", function () {
    const cron = new Cron();
    cron.fromString("1-10/5 1 1 1 1");
    const arr = cron.toArray();
    expect(arr).to.eql([[1, 6], [1], [1], [1], [1]]);
    arr[0] = [5];
    expect(cron.toArray()).to.eql([[1, 6], [1], [1], [1], [1]]);
    expect(cron.toString()).to.equal("1,6 1 1 1 1");
  });
});
