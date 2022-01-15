export const createYearArray = () => {
  // [2019, 2018, 2017, 2016, ..., 1969]
  const currentYear = (new Date()).getFullYear();
  const stop = currentYear - 10;
  return Array.from({length: (currentYear - stop) + 1}, (_, i) => currentYear + (i * -1));
}