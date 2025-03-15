import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { startOfToday, endOfToday } from "date-fns"
import { IMealPlan } from "@/types/IMealPlan"
import { INutrition } from "@/types/INutrition"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function getAmountOfDaysBetween(d1: Date, d2: Date) {
  const oneDay = 24 * 60 * 60 * 1000

  return Math.round(Math.abs((d1.getTime() - d2.getTime()) / oneDay))
}

export function getUniqueArray(array: any[]) {
  return Array.from(new Set(array))
}

export function getDateId(d1: Date) {
  return `${d1.getDate()}-${d1.getMonth()}-${d1.getFullYear()}`
}

export function getDateFromDateId(dateId: string) {
  const [date, month, year] = dateId.split("-")

  const _date = new Date()
  _date.setHours(0, 0, 0, 0)
  _date.setDate(parseInt(date))
  _date.setMonth(parseInt(month))
  _date.setFullYear(parseInt(year))
  
  return _date
}

export function isActiveMealPlan(mealPlan: IMealPlan) {
  const startDate = (mealPlan.startDate)
  const endDate = (mealPlan.endDate)

  const todayStart = startOfToday().getTime()
  const todayEnd = endOfToday().getTime()

  if (endDate < todayStart) return false
  if (startDate > todayEnd) return false

  return true
}

export function getClosestUpcomingMealPlan(mealPlans: IMealPlan[]) {
  const todayStart = startOfToday().getTime()

  const upcomingMealPlans = mealPlans.filter(mealPlan => mealPlan.endDate >= todayStart)

  const mealPlansAsc = upcomingMealPlans
    .slice()
    .sort((a, b) => a.startDate - b.startDate)

  return mealPlansAsc[0] || null
}

export function transformNutritionByServing(nutrition: INutrition, servingCount: number): INutrition {
  const { calories, macros } = nutrition
  const { carbs, fats, protein } = macros

  const multiplyByServing = (value: number, servingCount: number) => {
    if (!value) return 0

    return value * servingCount
  }

  return {
    calories: multiplyByServing(calories, servingCount),
    macros: {
      carbs: multiplyByServing(carbs, servingCount),
      fats: multiplyByServing(fats, servingCount),
      protein: multiplyByServing(protein, servingCount),
    }
  }
}

export function formatNutritionNumber(value: number) {
  return Math.round(value)
}

export function getMealPlanTitle(mealPlan: IMealPlan) {
  if (mealPlan.title) return mealPlan.title
  
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long"
  })

  return dateFormatter.formatRange(mealPlan.startDate, mealPlan.endDate)
}

export const weekDayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric" })