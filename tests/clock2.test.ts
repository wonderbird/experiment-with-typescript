import { clock2 } from "../src/clock2";

import "chai/register-should";
import { config } from "chai";
config.truncateThreshold = 0;

describe("clock2 should", () => {
  it("return", () => {
    clock2(0, []).should.deep.equal([]);
  });
});
