export const digitalRoot = (n: number): number => {
  let numberOfDigits = Math.floor(Math.log10(n)) + 1;

  let digitAt = (decimalPlace: number) =>
    Math.floor(n / Math.pow(10, decimalPlace)) % 10;

  let add = (a: number, b: number) => a + b;

  let sum = [...Array(numberOfDigits).keys()].map(digitAt).reduce(add, 0);
  if (sum >= 10) {
    return digitalRoot(sum);
  }

  return sum;
};
