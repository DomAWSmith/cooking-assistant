"use client"

import { IRecipe } from "@/types/IRecipe"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { Flame } from "lucide-react"
import { usePathname } from "next/navigation"

export function Recipe(recipe: IRecipe) {
  const pathname = usePathname()
  
  const href = `/recipes/${recipe.id}`
  
  return (
    <Link
      href={href}
      className={`${pathname === href ? "bg-sidebar-accent" : "text-sidebar-accent-foreground"} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0`}
    >
      <div className="flex w-full items-center gap-2">
        <span>{recipe.name}</span>{" "}
        <span className="ml-auto text-xs">{recipe.date}</span>
      </div>
      <div className="flex w-full gap-2 pt-2">
        <Badge className="font-mono font-light" variant="outline">{recipe.calories} <Flame /></Badge>
        <div className="flex gap-2 ml-auto">
          <Badge className="font-mono font-light bg-protein text-protein-foreground">{recipe.protein} P</Badge>
          <Badge className="font-mono font-light bg-fats text-fats-foreground">{recipe.fats} F</Badge>
          <Badge className="font-mono font-light bg-carbs text-carbs-foreground">{recipe.carbs} C</Badge>
        </div>
      </div>
    </Link>
  )
}
