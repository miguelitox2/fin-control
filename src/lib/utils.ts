import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextDueDate(day: number): Date {
  const now = new Date();
  const nextDate = new Date(now.getFullYear(), now.getMonth(), day);

  // Se o dia do vencimento já passou neste mês, joga para o próximo mês
  if (nextDate < now) {
    nextDate.setMonth(nextDate.getMonth() + 1);
  }
  return nextDate;
}

export const getCategoryInitials = (name: string) => {
  if (!name) return "??";
  const words = name.split(" ");
  const initials =
    words.length > 1 ? words[0][0] + words[1][0] : words[0].substring(0, 2);

  return initials.toUpperCase();
};
