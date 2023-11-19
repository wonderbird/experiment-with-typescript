export function lru(n: number, referencesList: number[]): number[] {
  let memory: number[] = Array(n).fill(-1);
  let target = 0;
  let birthdays: number[] = Array(n).fill(-1);

  for (
    let referenceIndex = 0;
    referenceIndex < referencesList.length;
    referenceIndex++
  ) {
    let pageId = referencesList[referenceIndex];

    const foundIndex = memory.indexOf(pageId);
    if (foundIndex !== -1) {
      birthdays[foundIndex] = referenceIndex;
      continue;
    }

    const oldest = Math.min(...birthdays);
    target = birthdays.indexOf(oldest);

    memory[target] = pageId;
    birthdays[target] = referenceIndex;

    target = (target + 1) % n;
  }

  return memory;
}
