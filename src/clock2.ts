export function clock2(n: number, referenceList: number[]): number[] {
  let pageIds: number[] = Array(n).fill(-1);
  let iterator: number = 0;

  for (const pageId of referenceList) {
    // request page
    pageIds[iterator] = pageId;
    iterator = iterator + 1;
  }

  return pageIds;
}
