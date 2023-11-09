export const digitalRoot = (n: number): number => {
  let sum = n
    .toString()
    .split("")
    .map(Number)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  if (sum >= 10) {
    return digitalRoot(sum);
  }

  return sum;
};
