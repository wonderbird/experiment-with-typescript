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

  describe("reuse references already in memory", () => {
    it.each([
      [2, [1, 1], [1, -1]],
      [3, [1, 2, 1], [1, 2, -1]],
      [3, [1, 2, 3, 1], [1, 2, 3]],
      [3, [1, 2, 3, 1, 2], [1, 2, 3]],
      [3, [1, 3, 1, 2], [1, 3, 2]],
    ])(
      "given n = %p, referenceList = %p",
      (n: number, referenceList: number[], expected: number[]) => {
        clock(n, referenceList).should.deep.equal(expected);
      }
    );
  });

  describe("use memory as circular buffer", () => {
    it.each([
      [1, [1, 2], [2]],
      [3, [1, 2, 3, 4, 5, 6], [4, 5, 6]],
    ])(
      "given n = %p, referenceList = %p",
      (n: number, referenceList: number[], expected: number[]) => {
        clock(n, referenceList).should.deep.equal(expected);
      }
    );
  });

  describe("keep pages referenced twice", () => {
    it.each([[2, [1, 1, 2, 3], [1, 3]]])(
      "given n = %p, referenceList = %p",
      (n: number, referenceList: number[], expected: number[]) => {
        clock(n, referenceList).should.deep.equal(expected);
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

describe("Regression tests: clock should", function () {
  // N = 12, REFERENCE LIST = [22,1,19,20,22,1,8,12,20,18,21,4,2,12,23,17,11,17,14,15,22,7,8,20,8,22,1,6,2,4,16,7,17,3,6,15,21,5,24,5,1,20,7,13]: expected [ 22, 5, 24, 1, 20, 13, 15, 7, 8, 6, 21, 17 ] to deeply equal [ 5, 24, 1, 20, 13, 3, 15, 7, 8, 6, 21, 17 ]
  it("pass codewars random test", function () {
    clock(
      12,
      [
        22, 1, 19, 20, 22, 1, 8, 12, 20, 18, 21, 4, 2, 12, 23, 17, 11, 17, 14,
        15, 22, 7, 8, 20, 8, 22, 1, 6, 2, 4, 16, 7, 17, 3, 6, 15, 21, 5, 24, 5,
        1, 20, 7, 13,
      ]
    ).should.deep.equal([5, 24, 1, 20, 13, 3, 15, 7, 8, 6, 21, 17]);
  });

  describe("treat pages referenced once the same as pages referenced multiple times", () => {
    it("given n = 3, referenceList = [1, 2, 3, 1, 1, 2, 4, 5]", () => {
      clock(3, [1, 2, 3, 1, 1, 2, 4, 5]).should.deep.equal([5, 2, 4]);
    });
  });
});
