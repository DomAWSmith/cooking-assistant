import { IRecipe } from "@/types/IRecipe"
import { Badge } from "./ui/badge"
import { Flame } from "lucide-react"
import { Macros } from "./macros"

export function Recipe(recipe: IRecipe) {
  const macros = {
    protein: recipe.protein,
    fats: recipe.fats,
    carbs: recipe.carbs,
  }

  return (
    <>
      <div className="flex w-full items-center gap-2">
        <span>{recipe.name}</span>{" "}
        <span className="ml-auto text-xs">{recipe.date}</span>
      </div>
      <div className="flex w-full gap-2 pt-2">
        <Badge className="font-mono font-light" variant="outline">{recipe.calories} <Flame /></Badge>
        <Macros {...macros} />
      </div>
    </>
  )
}
