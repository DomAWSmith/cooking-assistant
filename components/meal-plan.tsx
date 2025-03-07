"use client"

import { IMealPlan } from "@/types/IMealPlan"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { CookingPot, ListTodo } from "lucide-react"

export function MealPlan(mealPlan: IMealPlan) {
  return (
    <Link
      href={`/meal-plans/${mealPlan.id}`}
      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
    >
      <div className="flex w-full items-center gap-2">
        <span>{mealPlan.name}</span>{" "}
        <span className="ml-auto text-xs">{mealPlan.startDate} to {mealPlan.endDate}</span>
      </div>
      <div className="flex w-full gap-2 pt-2">
        <Badge className="font-mono font-light" variant="outline">{mealPlan.mealCount} <CookingPot /></Badge>
        <Badge className="font-mono font-light" variant="outline">{mealPlan.currentIngredientCount}/{mealPlan.totalIngredientCount} <ListTodo /></Badge>
      </div>
    </Link>
  )
}
