import { parseNumber } from "../src/util.js";
import { expect } from "chai";
import { units } from "../src/units.js";
import { ParseOptions, Unit } from "../src/types.js";

const parseOptions: ParseOptions = {
  enableLastDayOfMonth: true
};

const MINUTE_UNIT = units.find(unit => unit.name === 'minute') as Unit;
const DAY_UNIT = units.find(unit => unit.name === 'day') as Unit;

describe("parseNumber", function () {
  [
    { input: 0.0, output: 0 },
    { input: 0, output: 0 },
    { input: "0", output: 0 },
    { input: 123, output: 123 },
    { input: "123", output: 123 },
    { input: "   123   ", output: 123 },
    { input: "0123   ", output: 123 },
    { input: "  000123  ", output: 123 },
  ].forEach(({ input, output }) => {
    it(`should parse '${input}'`, function () {
      expect(parseNumber(MINUTE_UNIT, input, parseOptions)).to.equal(output);
    });
  });
  [
    "",
    " ",
    "+123",
    "-123",
    "1.2",
    "1,2",
    "12e5",
    "12e-5",
    "0xAB",
    "foo",
    " f00 ",
    "Infinity",
    "+Infinity",
    "-Infinity",
    null,
    undefined,
    true,
    false,
    10.1,
    0.1,
    Infinity,
    NaN,
    {},
  ].forEach((input) => {
    it(`should not parse '${input}'`, function () {
      expect(parseNumber(MINUTE_UNIT, input, parseOptions)).to.equal(undefined);
    });
  });

  it(`End of month alt name`, function () {
    expect(parseNumber(DAY_UNIT, 'L', {enableLastDayOfMonth: false})).to.equal(undefined);
    expect(parseNumber(DAY_UNIT, 'L', {enableLastDayOfMonth: true})).to.equal(-1);
    expect(parseNumber(DAY_UNIT, 1, parseOptions)).to.equal(1);
    expect(parseNumber(DAY_UNIT, -1, parseOptions)).to.equal(-1);
    expect(parseNumber(DAY_UNIT, 'NONE', parseOptions)).to.equal(undefined);
  });
});
