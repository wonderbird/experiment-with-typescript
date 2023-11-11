import "chai/register-should";
import { assert, config } from "chai";
import { clock } from "../src/clock";
config.truncateThreshold = 0;

describe("clock should", () => {
  describe("return [] when n is 0", () => {
    it.each([[[]], [[0]], [[1, 2]]])(
      "given referenceList = %p",
      (referenceList) => {
        clock(0, referenceList).should.deep.equal([]);
      }
    );
  });

  describe("return reference list when all reference are different and their length equals n", () => {
    it.each([[[1]], [[1, 2]], [[1, 2, 3]]])(
      "given referenceList = %p",
      (referenceList: number[]) => {
        clock(referenceList.length, referenceList).should.deep.equal(
          referenceList
        );
      }
    );
  });

  describe("represent unused pages by -1", () => {
    it.each([
      [1, [], [-1]],
      [2, [], [-1, -1]],
      [3, [], [-1, -1, -1]],
      [2, [1], [1, -1]],
      [5, [1, 2], [1, 2, -1, -1, -1]],
    ])(
      "given n = %p, referenceList = %p",
      (n: number, referenceList: number[], expected: number[]) => {
        clock(n, referenceList).should.deep.equal(expected);
      }
    );
  });
});

function doTest(n: number, referenceList: number[], expected: number[]) {
  const actual = clock(n, referenceList.slice());
  assert.deepEqual(
    actual,
    expected,
    `N = ${n}, REFERENCE LIST = [${referenceList}]\n`
  );
}

describe("Basic Tests", function () {
  xit("Basic Tests", function () {
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
