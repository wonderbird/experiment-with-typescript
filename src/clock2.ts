export function clock2(n: number, referenceList: number[]): number[] {
  let pageIds: number[] = Array(n).fill(-1);

  if (referenceList.length > 0) {
    pageIds[0] = referenceList[0];
  }

  return pageIds;
}
