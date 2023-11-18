export function clock2(n: number, referenceList: number[]): number[] {
  let pageIds: number[] = Array(n).fill(-1);
  let iterator: number = 0;

  for (const pageId of referenceList) {
    // request page
    pageIds[iterator] = pageId;

    // move iterator to next page
    iterator = (iterator + 1) % pageIds.length;
  }

  return pageIds;
}
