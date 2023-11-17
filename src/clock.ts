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

  class Page {
    constructor(public id: number, public referenceCounter: number) {}
  }

  let memory: Page[] = Array(n).fill(new Page(-1, 0));

  let iterator: number = 0;

  class Memory {
    private pages: Page[] = [];

    constructor(pages: Page[]) {
      this.pages = pages;
    }
  }

  let alternativeMemory: Memory = new Memory(memory);

  function findPageInMemory(reference: number) {
    return memory.find((page) => page.id === reference);
  }

  function getIterator() {
    return iterator;
  }

  function getCurrentPage() {
    return memory[getIterator()];
  }

  function replacePage(reference: number) {
    memory[getIterator()] = { id: reference, referenceCounter: 0 };
  }

  function advanceIterator() {
    iterator = (getIterator() + 1) % n;
  }

  for (let reference of referenceList) {
    let found = false;
    while (!found) {
      let page = findPageInMemory(reference);
      found = page !== undefined;
      if (!page) {
        if (getCurrentPage().referenceCounter > 0) {
          getCurrentPage().referenceCounter--;
          advanceIterator();
        } else {
          replacePage(reference);
          advanceIterator();
          found = true;
        }
      } else {
        page.referenceCounter++;
      }
    }
  }

  return memory.map((page) => page.id);
}
