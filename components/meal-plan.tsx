"use client"

import { IMealPlan } from "@/types/IMealPlan"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { CookingPot, ListTodo } from "lucide-react"
import { usePathname } from "next/navigation"

export function MealPlan(mealPlan: IMealPlan) {
  const pathname = usePathname()

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric"
  });

  const href = `/meal-plans/${mealPlan.id}`

  return (
    <Link
      href={href}
      className={`${pathname === href ? "bg-sidebar-accent" : "text-sidebar-accent-foreground"} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0`}
    >
      <div className="flex w-full items-center gap-2">
        <span>{mealPlan.title}</span>{" "}
        <span className="ml-auto text-xs">
          {dateFormatter.formatRange(mealPlan.startDate, mealPlan.endDate)}
        </span>
      </div>
      <div className="flex w-full gap-2 pt-2">
        <Badge className="font-mono font-light" variant="outline">{mealPlan.mealCount} <CookingPot /></Badge>
        <Badge className="font-mono font-light" variant="outline">{mealPlan.currentIngredientCount}/{mealPlan.totalIngredientCount} <ListTodo /></Badge>
      </div>
    </Link>
  )
}
