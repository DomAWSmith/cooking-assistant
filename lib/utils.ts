import { MealType } from "@/types/enums/MealType"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Whether a second date is after the first date (ignoring their times)
 * @param d1 First date
 * @param d2 Second date
 * @returns 
 */
export function isAfterToday(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() < d2.getDate()
}

/**
 * Get a relative date message
 * @param d1 First date
 * @param d2 Second date
 * @returns Pretty relative date (e.g. in 7 days)
 */
export function relativeDate(d1: Date, d2: Date) {
  const rtf1 = new Intl.RelativeTimeFormat("en", { 
    style: "long",
    numeric: "auto"
  })
  const oneDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round(Math.abs((d1.getTime() - d2.getTime()) / oneDay))

  return rtf1.format(diffDays, "day")
}

export function getUniqueArray(array: any[]) {
  return Array.from(new Set(array))
}

export function getMealTypeTitle(mealType: MealType) {
  switch (mealType) {
    case MealType.BREAKFAST:
      return "Breakfast"
    case MealType.LUNCH:
      return "Lunch"
    case MealType.DINNER:
      return "Dinner"
  }
  return "Unknown"
}