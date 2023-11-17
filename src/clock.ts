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

  class Memory {
    private pages: Page[] = [];
    private _iterator: number = 0;

    constructor(n: number) {
      this.pages = Array(n).fill(new Page(-1, 0));
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

    public request(pageReference: number) {
      let found = false;
      while (!found) {
        let page = this.find(pageReference);
        found = page !== undefined;
        if (!page) {
          if (this.currentPage().referenceCounter > 0) {
            this.currentPage().referenceCounter--;
            this.advanceIterator();
          } else {
            this.replaceCurrentPage(pageReference);
            this.advanceIterator();
            found = true;
          }
        } else {
          page.referenceCounter++;
        }
      }
    }
  }

  let alternativeMemory: Memory = new Memory(n);

  for (let reference of referenceList) {
    alternativeMemory.request(reference);
  }

  return alternativeMemory.pageIds;
}
