export function clock2(n: number, referenceList: number[]): number[] {
  let pageIds: number[] = Array(n).fill(-1);
  let referenced: boolean[] = Array(n).fill(false);
  let iterator: number = 0;

  referenceList.map(request);

  return pageIds;

  function request(pageId: number) {
    // request page

    const foundIndex = pageIds.findIndex((id) => id == pageId);
    if (foundIndex !== -1) {
      referenced[foundIndex] = true;
      return;
    }

    while (referenced[iterator]) {
      referenced[iterator] = false;

      // move iterator to next page
      iterator = (iterator + 1) % pageIds.length;
    }

    pageIds[iterator] = pageId;

    // move iterator to next page
    iterator = (iterator + 1) % pageIds.length;
  }
}
