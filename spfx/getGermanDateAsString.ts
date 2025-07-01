// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export function getGermanDateAsString(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return date.toLocaleDateString("de-DE", options)
}

export function getGermanDateStringToDate(str: string): Date {
  return new Date(str.replace(/(.*)\.(.*)\.(.*)/, '$3-$2-$1'));
}