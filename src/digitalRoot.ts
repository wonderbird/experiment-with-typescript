export const digitalRoot = (n: number): number => {
  let sum = [...Array(numberOfDigits()).keys()].map(digitAt).reduce(add, 0);

  if (sum >= 10) {
    return digitalRoot(sum);
  }

  return sum;

  function numberOfDigits(): number {
    return Math.floor(Math.log10(n)) + 1;
  }

  function digitAt(decimalPlace: number): number {
    return Math.floor(n / Math.pow(10, decimalPlace)) % 10;
  }

  function add(a: number, b: number) {
    return a + b;
  }
};
