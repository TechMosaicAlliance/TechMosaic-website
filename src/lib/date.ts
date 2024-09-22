export function formatDate(inputDate: Date) {
  const dateObject = new Date(inputDate);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString(undefined, options);
  return formattedDate;
}
