export const parseData = (date: string) => {
  const dateParts = date.split("-");
  return new Date(
    parseInt(dateParts[2], 10),
    parseInt(dateParts[1], 10) - 1,
    parseInt(dateParts[0], 10)
  );
};
