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

export function formatTimeAgo(createdAt: string): string {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 60) return `há ${diffMinutes}m`;

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) return `há ${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);

  return `há ${diffDays}d`;
}

export function toISO(ddmmyyyy: string): string {
  const [dd, mm, yyyy] = ddmmyyyy.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

export function parseDateForDB(dateStr?: string) {
  if (!dateStr) return null;

  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
}

export function formatWeekdayDate(isoDate?: string): string {
  if (!isoDate) return "";

  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });

  return `Dia ${day} - ${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}`;
}

export function formatBrDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function parseBrDate(value: string): Date | null {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return null;

  const [, day, month, year] = match.map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  )
    return null;
  return date;
}
