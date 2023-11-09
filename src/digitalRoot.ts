export const digitalRoot = (n: number): number => {
  let sum = [...Array(numberOfDigits()).keys()]
    .map(digitAt)
    .reduce((sum, digit) => sum + digit, 0);

  return sum;

  function numberOfDigits(): number {
    return Math.floor(Math.log10(n)) + 1;
  }

  function digitAt(decimalPlace: number): number {
    return Math.floor(n / Math.pow(10, decimalPlace)) % 10;
  }
};
