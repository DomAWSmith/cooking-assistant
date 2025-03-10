"use client"

import { IRecipe } from "@/types/IRecipe"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Flame } from "lucide-react"
import { Recipe } from "./recipe"

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
        <div
          key={recipe.id}
          onClick={() => toggleSelect(recipe.id)}
          className="w-full text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-row items-center gap-2 border-b text-sm leading-tight whitespace-nowrap last:border-b-0"
        >
          <div className="pl-4 flex items-center">
            <Checkbox tabIndex={-1} checked={selectedIds.includes(recipe.id)} />
          </div>
          <div className="flex w-full flex-col items-start gap-2 pl-2 p-4">
            <Recipe recipe={recipe} />
          </div>
        </div>
      ))}
    </>
  )
}
