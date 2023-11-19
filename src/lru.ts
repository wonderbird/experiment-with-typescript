export function lru(n: number, referencesList: number[]): number[] {
  let memory: number[] = Array(n).fill(-1);
  let targetIndex = 0;

  for (
    let referenceIndex = 0;
    referenceIndex < referencesList.length;
    referenceIndex++
  ) {
    if (memory.includes(referencesList[referenceIndex])) {
      continue;
    }

    memory[targetIndex] = referencesList[referenceIndex];
    targetIndex = targetIndex + 1;
  }

  return memory;
}
