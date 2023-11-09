import "chai/register-should";
import { expect } from "chai";
import { narcissistic } from "../src/narcissistic";

describe("narcissistic should", () => {
  // My understanding of the problem
  // ---
  // 1, 2, 3 ..., 9 -> true
  // 10, 11, 12, ..., 99 -> false
  // 153 -> 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153 -> true
  // ---
  // For each digit, raise it to the power of the number of digits
  // Sum the results
  // If the sum equals the original number, return true
  // Otherwise, return false

  describe("return true when n < 10", () => {
    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])("n = %p", (n) => {
      narcissistic(n).should.equal(true);
    });
  });

  describe("return true for narcissistic numers > 10", () => {
    it.each([153, 1634])("n = %p", (n) => {
      narcissistic(n).should.equal(true);
    });
  });

  describe("return false for non-narcissistic numbers", () => {
    it.each([10])("n = %p", (n) => {
      narcissistic(n).should.equal(false);
    });
  });
});

describe("Basic tests", () => {
  it("Basic test should work", () => {
    expect(narcissistic(7)).to.equal(true, "7 is narcissistic");
    expect(narcissistic(153)).to.equal(true, "153 is narcissistic");
    expect(narcissistic(1634)).to.equal(true, "1634 is narcissistic");
    expect(narcissistic(1938)).to.equal(false, "1938 is not narcissistic");
  });
});
