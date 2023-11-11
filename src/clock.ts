// My understanding of the problem:
//
// n: maximum number of pages that can be stored in memory at the same time
// referenceList: IDs of the pages requested one after the other
//
// returns: status of memory after application of the algorithm
//
// test cases:
//
// | n | referenceList     | expected |
// |---|-------------------|----------|
// | 0 | any               | []       |
// | 1 | []                | [-1]     |
// | 2 | []                | [-1, -1] |
// | 2 | any one element   | [that element, -1] |
// | 2 | any two different elements  | [first, second] |
// | 1 | any               | [last element in referenceList] |
// | 2 | any number of same elements  | [that element, -1] |
// | 2 | two different elements alternating  | depends on sequence |
export function clock(n: number, referenceList: number[]): number[] {
  if (n === 0) return [];

  let unusedPages: number[] = Array(n - referenceList.length).fill(-1);

  return [...referenceList, ...unusedPages];
}
