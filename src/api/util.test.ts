import { fromCents, toCents } from "./util";

describe("Currency Conversion tests", () => {
  test("That no rounding errors occur", () => {
    // These numbers have been identified as causing
    // rounding errors
    const tests = [
      { dollars: 34.41, cents: 3441 },
      { dollars: 10.12, cents: 1012 },
      { dollars: 10.13, cents: 1013 },
      { dollars: 10.21, cents: 1021 },
    ];

    tests.forEach(({ dollars, cents }) => {
      expect(toCents(dollars)).toEqual(cents);
      expect(fromCents(cents)).toEqual(dollars);
    });
  });
});
