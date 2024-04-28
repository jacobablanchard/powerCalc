import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { months, type Month } from "@/components/MonthSelector";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addMonth(startMonth: Month, monthsToAdd: number) {
  const monthIndex = months.indexOf(startMonth);
  const returnIndex = (monthsToAdd + monthIndex) % months.length;
  return months[returnIndex];
}
