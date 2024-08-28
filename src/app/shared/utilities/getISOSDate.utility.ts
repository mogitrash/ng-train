export function getISOSDate(date: Date) {
  date.setUTCHours(0, 0, 0, 0);

  return date.toISOString().split('T')[0];
}
