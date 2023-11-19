import { lru } from "../src/lru";

import "chai/register-should";
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
  it("Basic Tests", function () {
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

describe("lru should", () => {
  describe("return empty memory when no page allocated and", () => {
    it.each([
      [1, [], [-1]],
      [2, [], [-1, -1]],
      [5, [], [-1, -1, -1, -1, -1]],
    ])("n is %p", (n: number, _: number[], expected: number[]) => {
      lru(n, []).should.deep.equal(expected);
    });
  });

  describe("fill empty memory sequentially", () => {
    it.each([
      [1, [1], [1]],
      [2, [1], [1, -1]],
      [3, [1, 2], [1, 2, -1]],
      [5, [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
    ])(
      "n = %p, referencesList = %p -> %p",
      (n: number, referencesList: number[], expected: number[]) => {
        lru(n, referencesList).should.deep.equal(expected);
      }
    );
  });

  describe("reuse pages already in memory", () => {
    it.each([
      [2, [1, 1], [1, -1]],
      [3, [1, 2, 2, 1, 5], [1, 2, 5]],
    ])(
      "n = %p, referencesList = %p -> %p",
      (n: number, referencesList: number[], expected: number[]) => {
        lru(n, referencesList).should.deep.equal(expected);
      }
    );
  });

  describe("wrap around when all allocated pages are different", () => {
    it.each([
      [2, [1, 2, 3], [3, 2]],
      [3, [1, 2, 3, 4, 5, 6, 7], [7, 5, 6]],
    ])(
      "n = %p, referencesList = %p -> %p",
      (n: number, referencesList: number[], expected: number[]) => {
        lru(n, referencesList).should.deep.equal(expected);
      }
    );
  });

  describe("replace last recently used page", () => {
    it.each([
      [2, [1, 2, 3], [3, 2]],
      [2, [1, 2, 1, 3], [1, 3]],
    ])(
      "n = %p, referencesList = %p -> %p",
      (n: number, referencesList: number[], expected: number[]) => {
        lru(n, referencesList).should.deep.equal(expected);
      }
    );
  });
});

// Algorithm Design
// ================
//
// Assumptions
// -----------
//
// - n > 0
// - reference list contains only numbers > 0
// - empty memory page has id -1
//
// Data definitions
// ----------------
//
// - PageId: number             A valid page ID is either -1 for empty or > 0
// - memory: PageId[]           Memory is the list memory cells each containing a pageId; length n
// - birthdays: number[]        Loop index, when memory cell with the same index was assigned or accessed last
// - targetIndex: number        Index of target memory cell
//
// Algorithm
// ---------------
//
// n, referencesList -> pageIds
//
// Initialize memory of size n with empty pages
// targetIndex = 0
// For pageId, referenceIndex of referencesList:
//   If pageId is in memory:
//     Set lru at index of memory cell to referenceIndex
//   Else
//     If memory is full:
//       Set targetIndex to index of oldest page in memory
//     Replace page at targetIndex by pageId
//     Increase targetIndex by 1
