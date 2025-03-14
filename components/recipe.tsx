import { Flame } from "lucide-react"
import { IRecipe } from "@/types/IRecipe"
import { Badge } from "@/components/ui/badge"
import { Macros } from "@/components/macros"

interface Props {
  recipe: IRecipe
  separateNutrition?: boolean
}

export function Recipe({ recipe, separateNutrition = true }: Props) {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="overflow-hidden truncate max-w-48 font-semibold">{recipe.name}</div>
        <div className="text-xs shrink-0">{recipe.date}</div>
      </div>
      <div className={`flex w-full gap-2 pt-2 ${separateNutrition ? "justify-between" : "justify-end"}`}>
        <Badge className="font-mono font-light" variant="outline">{recipe.nutrition.calories} <Flame /></Badge>
        <Macros macros={recipe.nutrition.macros} />
      </div>
    </>
  )
}
