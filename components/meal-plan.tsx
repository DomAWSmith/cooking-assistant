"use client"

import { IMealPlan } from "@/types/IMealPlan"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { CookingPot, ListTodo } from "lucide-react"
import { usePathname } from "next/navigation"
import { getMealPlanTitle } from "@/lib/utils"

export function MealPlan(mealPlan: IMealPlan) {
  const pathname = usePathname()

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric"
  });

  const href = `/meal-plans/${mealPlan.id}`

  let mealCount = 0
  let totalIngredientCount = 0
  mealPlan.dates.forEach(date => {
    mealCount += date.meals.length

    date.meals.forEach(meal => {
      totalIngredientCount += meal.recipe.ingredients.length
    })
  })

  return (
    <Link
      href={href}
      className={`flex ${pathname === href ? "bg-sidebar-accent" : "text-sidebar-accent-foreground"} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="overflow-hidden truncate max-w-48 font-semibold">{getMealPlanTitle(mealPlan)}</div>
        <div className="text-xs shrink-0">
          {dateFormatter.formatRange(mealPlan.startDate, mealPlan.endDate)}
        </div>
      </div>
      <div className="flex w-full gap-2 pt-2">
        <Badge className="font-mono font-light" variant="outline">{mealCount} <CookingPot /></Badge>
        <Badge className="font-mono font-light" variant="outline">{mealPlan.currentIngredientCount}/{totalIngredientCount} <ListTodo /></Badge>
      </div>
    </Link>
  )
}
