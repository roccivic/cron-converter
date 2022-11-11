import { arrayToString, getSchedule, stringToArray } from "../src/index.js";
import { expect } from "chai";

describe("Should throw when uninstanciated", function () {
  it("on arrayToString", function () {
    expect(() => arrayToString(undefined as any)).to.throw("Invalid cron array");
  });
  it("on stringToArray", function () {
    expect(() => stringToArray(undefined as any)).to.throw("Invalid cron string");
  });
  it("on getSchedule", function () {
    expect(() => getSchedule(undefined as any)).to.throw("Invalid cron array");
  });
});
