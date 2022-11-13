import { getUnits } from "../src/index.js";
import { expect } from "chai";

describe("getUnits", function () {
  it("should returns units", function () {
    expect(getUnits().map((unit) => unit.name)).to.eql([
      "minute",
      "hour",
      "day",
      "month",
      "weekday",
    ]);
  });
});
