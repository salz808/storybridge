/**
 * Calculates the next occurrence of a specific day of the week.
 * 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
 */
export function getNextDayOfWeek(dayOfWeek: number, fromDate: Date = new Date()): Date {
  const resultDate = new Date(fromDate);
  resultDate.setDate(fromDate.getDate() + (7 + dayOfWeek - fromDate.getDay()) % 7);
  // Ensure it's at least 24 hours away if it's the same day
  if (resultDate.getTime() <= fromDate.getTime() + 24 * 60 * 60 * 1000) {
    resultDate.setDate(resultDate.getDate() + 7);
  }
  // Set to standard time: 10:00 AM
  resultDate.setHours(10, 0, 0, 0);
  return resultDate;
}
