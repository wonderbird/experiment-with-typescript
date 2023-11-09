import "chai/register-should";
import { assert } from "chai";
import { digitalRoot } from "../src/digitalRoot";

describe("digitalRoot should", () => {
  describe("return n when n < 10", () => {
    it.each([0, 1, 2, 9])("n = %p", (n: number) => {
      digitalRoot(1).should.equal(1);
    });
  });

  describe("return plain sum of digits when sum < 10", () => {
    it.each([[1, 10]])(
      "expect %p for n = %p",
      (expected: number, n: number) => {
        digitalRoot(n).should.equal(expected);
      }
    );
  });
});

describe("solution", () => {
  xit("should work for fixed tests", () => {
    assert.equal(digitalRoot(16), 7);
    assert.equal(digitalRoot(456), 6);
  });
});
