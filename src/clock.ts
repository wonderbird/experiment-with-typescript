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
    private _iterator: number = 0;

    constructor(pages: Page[]) {
      this.pages = pages;
    }

    public get iterator() {
      return this._iterator;
    }

    public set iterator(value: number) {
      this._iterator = value;
    }

    public advanceIterator(): void {
      this.iterator = (this.iterator + 1) % n;
    }

    public find(reference: number) {
      return this.pages.find((page) => page.id === reference);
    }

    public currentPage(): Page {
      return this.pages[this.iterator];
    }

    public replaceCurrentPage(reference: number) {
      this.pages[this.iterator] = new Page(reference, 0);
    }

    public get pageIds(): number[] {
      return this.pages.map((page) => page.id);
    }
  }

  let alternativeMemory: Memory = new Memory(memory);

  for (let reference of referenceList) {
    let found = false;
    while (!found) {
      let page = alternativeMemory.find(reference);
      found = page !== undefined;
      if (!page) {
        if (alternativeMemory.currentPage().referenceCounter > 0) {
          alternativeMemory.currentPage().referenceCounter--;
          alternativeMemory.advanceIterator();
        } else {
          alternativeMemory.replaceCurrentPage(reference);
          alternativeMemory.advanceIterator();
          found = true;
        }
      } else {
        page.referenceCounter++;
      }
    }
  }

  return alternativeMemory.pageIds;
}
