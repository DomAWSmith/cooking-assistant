"use client"

import { IRecipe } from "@/types/IRecipe"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Flame } from "lucide-react"

interface Props {
  recipes: IRecipe[]
  selectedIds: string[]
  onSelect: (recipeIds: string[]) => void
}

export function RecipeSelect({ recipes, selectedIds, onSelect }: Props) {

  const toggleSelect = (selectedId: string) => {
    if (selectedIds.includes(selectedId)) {
      onSelect(selectedIds.filter(id => id !== selectedId))
    } else {
      onSelect([...selectedIds, selectedId])
    }
  }

  return (
    <>
      {recipes.map((recipe) => (
        <button
          key={recipe.id}
          onClick={() => toggleSelect(recipe.id)}
          className="w-full text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-row items-center gap-2 border-b text-sm leading-tight whitespace-nowrap last:border-b-0"
        >
          <div className="pl-4 flex items-center">
            <Checkbox tabIndex={-1} checked={selectedIds.includes(recipe.id)} />
          </div>
          <div className="flex w-full flex-col items-start gap-2 pl-2 p-4">
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
          </div>
        </button>
      ))}
    </>
  )
}
