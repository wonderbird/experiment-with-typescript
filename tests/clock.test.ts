import { assert, config } from "chai";
import { clock } from "../src/clock";
config.truncateThreshold = 0;

function doTest(n: number, referenceList: number[], expected: number[]) {
  const actual = clock(n, referenceList.slice());
  assert.deepEqual(
    actual,
    expected,
    `N = ${n}, REFERENCE LIST = [${referenceList}]\n`
  );
}

describe("Basic Tests", function () {
  it("Basic Tests", function () {
    const TESTS: [number, number[], number[]][] = [
      [4, [1, 2, 3, 4, 5, 5, 3, 6, 7, 8], [5, 8, 3, 7]],
      [3, [1, 2, 3, 4, 2, 5], [4, 2, 5]],
      [4, [1, 2], [1, 2, -1, -1]],
      [3, [6, 3, 6, 3, 2, 5, 1, 6], [1, 6, 5]],
      [5, [], [-1, -1, -1, -1, -1]],
      [1, [1, 2, 3, 4, 5], [5]],
    ];
    for (const [n, referencesList, expected] of TESTS)
      doTest(n, referencesList, expected);
  });
});
