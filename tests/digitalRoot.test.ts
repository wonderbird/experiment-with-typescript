import "chai/register-should";
import { assert } from "chai";
import { digitalRoot } from "../src/digitalRoot";

describe("digitalRoot should", () => {
  it.each([0, 1, 2])("return n when n is %p", (n: number) => {
    digitalRoot(1).should.equal(1);
  });
});

describe("solution", () => {
  xit("should work for fixed tests", () => {
    assert.equal(digitalRoot(16), 7);
    assert.equal(digitalRoot(456), 6);
  });
});
