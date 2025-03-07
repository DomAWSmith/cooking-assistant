"use client"

import { IMealPlan } from "@/types/IMealPlan"
import { Badge } from "./ui/badge"

export function MealPlan(mealPlan: IMealPlan) {
  return (
    <a
      href="#"
      key={mealPlan.id}
      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
    >
      <div className="flex w-full items-center gap-2">
        <span>{mealPlan.name}</span>{" "}
        <span className="ml-auto text-xs">{mealPlan.startDate} to {mealPlan.endDate}</span>
      </div>
      <div className="flex w-full gap-2 pt-2">
        <Badge className="font-mono font-light" variant="outline">{mealPlan.mealCount} <span>meals</span></Badge>
      </div>
    </a>
  )
}
