export function arrayDiff(a: number[], b: number[]): number[] {
    let result: number[] = []

    a.forEach(value => {
        if (!b.includes(value)) {
            result.push(value);
        }
    })

    return result;
}
