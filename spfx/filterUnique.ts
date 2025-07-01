// gets ["A", "A", "B", "B"] returns ["A", "B"]
export function filterUnique(strings?: string[]): string[]| undefined {
  if(!strings) {
    return undefined
  }
  return strings.filter((value, index, array) => strings.indexOf(value) === index);
}