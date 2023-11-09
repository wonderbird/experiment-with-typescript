export function narcissistic(value: number): boolean {
  const digits = value.toString().split("");
  const power = digits.length;
  const sum = digits
    .map(Number)
    .reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return value === sum;
}
