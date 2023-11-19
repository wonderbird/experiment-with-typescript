import { lru } from "../src/lru";

import { assert, config } from "chai";
config.truncateThreshold = 0;

function doTest(n: number, referenceList: number[], expected: number[]) {
  const actual = lru(n, referenceList.slice());
  assert.deepEqual(
    actual,
    expected,
    `N = ${n}, REFERENCE LIST = [${referenceList}]\n`
  );
}

describe("Basic Tests", function () {
  xit("Basic Tests", function () {
    const TESTS: [number, number[], number[]][] = [
      [3, [1, 2, 3, 4, 3, 2, 5], [5, 2, 3]],
      [5, [], [-1, -1, -1, -1, -1]],
      [4, [5, 4, 3, 2, 3, 5, 2, 6, 7, 8], [8, 6, 7, 2]],
      [4, [1, 1, 1, 2, 2, 3], [1, 2, 3, -1]],
      [1, [5, 4, 3, 3, 4, 10], [10]],
      [3, [1, 1, 1, 1, 1, 1, 1, 1], [1, -1, -1]],
      [
        5,
        [10, 9, 8, 7, 7, 8, 7, 6, 5, 4, 3, 4, 3, 4, 5, 6, 5],
        [5, 4, 3, 7, 6],
      ],
    ];
    for (const [n, referencesList, expected] of TESTS)
      doTest(n, referencesList, expected);
  });
});
