import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "PPP");
}

export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM d, yyyy");
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
