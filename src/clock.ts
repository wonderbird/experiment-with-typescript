class Page {
  constructor(public id: number, public referenceCounter: number) {}
}

class Memory {
  private readonly pages: Page[] = [];
  private iterator: number = 0;

  constructor(n: number) {
    this.pages = Array(n).fill(new Page(-1, 0));
  }

  public get pageIds(): number[] {
    return this.pages.map((page) => page.id);
  }

  public request(pageReference: number) {
    if (this.contains(pageReference)) {
      this.increment(pageReference);
    } else {
      this.findInsertPosition();
      this.insert(pageReference);
    }
  }

  private contains(pageReference: number) {
    return this.pages.some((page) => page.id === pageReference);
  }

  private increment(pageReference: number) {
    let page = this.pages.find((page) => page.id === pageReference)!;
    page.referenceCounter++;
  }

  private findInsertPosition() {
    if (this.currentPage().referenceCounter > 0) {
      this.currentPage().referenceCounter--;
      this.advanceIterator();
      this.findInsertPosition();
    }
  }

  private advanceIterator(): void {
    this.iterator = (this.iterator + 1) % this.pages.length;
  }

  private currentPage(): Page {
    return this.pages[this.iterator];
  }

  private insert(reference: number) {
    this.pages[this.iterator] = new Page(reference, 0);
    this.advanceIterator();
  }
}

export function clock(n: number, referenceList: number[]): number[] {
  if (n === 0) return [];

  let memory: Memory = new Memory(n);

  referenceList.map(memory.request.bind(memory));

  return memory.pageIds;
}
