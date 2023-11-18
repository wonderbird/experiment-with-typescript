class Page {
  private rBit: boolean = false;

  constructor(public id: number) {}

  public setR() {
    this.rBit = true;
  }

  public unsetR() {
    this.rBit = false;
  }

  public get r(): boolean {
    return this.rBit;
  }
}

class Memory {
  private readonly pages: Page[] = [];
  private iterator: number = 0;

  constructor(n: number) {
    this.pages = Array(n).fill(new Page(-1));
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
    page.setR();
  }

  private findInsertPosition() {
    if (this.currentPage().r) {
      this.currentPage().unsetR();
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
    this.pages[this.iterator] = new Page(reference);
    this.advanceIterator();
  }
}

export function clock(n: number, referenceList: number[]): number[] {
  if (n === 0) return [];

  let memory: Memory = new Memory(n);

  referenceList.map(memory.request.bind(memory));

  return memory.pageIds;
}
