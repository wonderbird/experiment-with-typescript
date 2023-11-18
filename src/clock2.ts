export function clock2(n: number, referenceList: number[]): number[] {
  if (referenceList.length > 0) {
    return Array(n).fill(referenceList[0]);
  }

  return Array(n).fill(-1);
}
