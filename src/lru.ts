export function lru(n: number, referencesList: number[]): number[] {
  let memory: number[] = Array(n).fill(-1);

  for (
    let referenceIndex = 0;
    referenceIndex < referencesList.length;
    referenceIndex++
  ) {
    memory[referenceIndex] = referencesList[referenceIndex];
  }

  return memory;
}
