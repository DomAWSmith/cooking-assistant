import { Flame } from "lucide-react"
import { IRecipe } from "@/types/IRecipe"
import { Badge } from "@/components/ui/badge"
import { Macros } from "@/components/macros"

export function Recipe(recipe: IRecipe) {
  return (
    <>
      <div className="flex w-full items-center gap-2">
        <span>{recipe.name}</span>{" "}
        <span className="ml-auto text-xs">{recipe.date}</span>
      </div>
      <div className="flex w-full gap-2 pt-2">
        <Badge className="font-mono font-light" variant="outline">{recipe.nutrition.calories} <Flame /></Badge>
        <Macros {...recipe.nutrition.macros} />
      </div>
    </>
  )
}
