import { IRecipe } from "@/types/IRecipe"
import { Recipe } from "@/components/recipe"
import { GripVertical } from "lucide-react"

export function RecipeDraggable(recipe: IRecipe) {
  return (
    <div className="w-full text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-row items-center gap-2 text-sm leading-tight whitespace-nowrap">
      <GripVertical className="ml-4 opacity-50" />
      <div className="flex w-full flex-col items-start gap-2 pl-2 p-4">
        <Recipe {...recipe} />
      </div>
    </div>
  )
}
