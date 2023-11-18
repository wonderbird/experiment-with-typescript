import { clock2 } from "../src/clock2";

import "chai/register-should";
import { config } from "chai";
config.truncateThreshold = 0;

// Steps of the clock algorithm
//
// Assumptions
// ===========
//
// - n always > 0
// - reference list contains only numbers > 0
// - empty memory page has id -1
//
// Algorithm
// =========
//
// Goal: Allocate all pages given to the clock2 call.
//
// Initialize memory with empty pages
// For every page id in the reference list:
//   Request page
// return the ids of pages in memory
//
// Request page algorithm
// ----------------------
//
// Goal: Allocate a single page by its page id
//
// If the page is already in memory:
//   Set the referenced bit and return
//
// While the referenced bit of the current page is set:
//    Unset the referenced bit
//    Move iterator to next page (including wrap around)
//
// Replace the current page with the requested page
//
// Move iterator to next page (including wrap around)
//
// Data structures
// ===============
//
// Page: Tuple of
//   id : number
//   referenced : boolean
//
// Memory: Array of Page
//
describe("clock2 should", () => {
  describe("return empty memory when no page is allocated", () => {
    it.each([
      [1, [], [-1]],
      [2, [], [-1, -1]],
      [5, [], [-1, -1, -1, -1, -1]],
    ])(
      "given n = %p, referenceList = %p",
      (n: number, referenceList: number[], expected: number[]) => {
        clock2(n, referenceList).should.deep.equal(expected);
      }
    );
  });

  describe("sequentially fill memory with allocated pages", () => {
    it.each([
      [1, [1], [1]],
      [1, [9], [9]],
      [2, [23], [23, -1]],
      [4, [42], [42, -1, -1, -1]],
      [4, [1, 42], [1, 42, -1, -1]],
      [4, [1, 3, 5, 7], [1, 3, 5, 7]],
    ])(
      "given n = %p, referenceList = %p -> %p",
      (n: number, referenceList: number[], expected: number[]) => {
        clock2(n, referenceList).should.deep.equal(expected);
      }
    );
  });

  describe("wrap around when more pages allocated than available memory", () => {
    it.each([
      [1, [1, 2], [2]],
      [3, [1, 2, 3, 4, 5], [4, 5, 3]],
      [3, [1, 2, 3, 4, 5, 6, 7], [7, 5, 6]],
    ])(
      "given n = %p, referenceList = %p -> %p",
      (n: number, referenceList: number[], expected: number[]) => {
        clock2(n, referenceList).should.deep.equal(expected);
      }
    );
  });
});
