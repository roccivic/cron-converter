import { fromString, getSchedule, toArray, toString } from "../src/cron";
import { expect } from "chai";

describe("Should throw when uninstanciated", function () {
  it("on toString", function () {
    expect(() => toString(undefined as any)).to.throw("No schedule found");
  });
  it("on toArray", function () {
    expect(() => toArray(undefined as any)).to.throw("No schedule found");
  });
  it("on schedule", function () {
    expect(() => getSchedule(undefined as any)).to.throw("No schedule found");
  });
});
describe("Result of toArray should not affect object", function () {
  it("on change", function () {
    const parts = fromString("1-10/5 1 1 1 1");
    const arr = toArray(parts);
    expect(arr).to.eql([[1, 6], [1], [1], [1], [1]]);
    arr[0] = [5];
    expect(toArray(parts)).to.eql([[1, 6], [1], [1], [1], [1]]);
    expect(toString(parts)).to.equal("1,6 1 1 1 1");
  });
});
