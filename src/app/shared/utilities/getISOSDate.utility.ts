export function getISOSDate(date: Date) {
  date.setHours(0, 0, 0, 0);
  return date.toISOString().split('T')[0];
}
