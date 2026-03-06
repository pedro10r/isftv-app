const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function formatDateRange(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return "-";

  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "-";

  const startStr = `${start.getDate()} ${MONTHS[start.getMonth()]}`;
  const endStr = `${end.getDate()} ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;

  return startDate === endDate ? endStr : `${startStr} – ${endStr}`;
}
