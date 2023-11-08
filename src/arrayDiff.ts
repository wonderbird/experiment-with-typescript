export function arrayDiff(a: number[], b: number[]): number[] {
    return a.filter(value => !b.includes(value));
}
