import {
  format,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  addDays
} from "date-fns";

export function generateCalendarDays(currentDate) {
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));
  const days = [];

  let day = start;
  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
}

export function formatMonthYear(date) {
  return format(date, "MMMM yyyy");
}
