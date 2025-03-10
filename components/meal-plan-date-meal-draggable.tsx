import { Recipe } from "@/components/recipe"
import { GripVertical, Minus, Plus } from "lucide-react"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { transformNutritionByServing } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/hooks"
import { mealPlanDateMealServingChanged } from "@/app/reducers/mealPlansSlice"

interface Props {
  mealPlanId: string
  dateId: string
  dateMeal: IMealPlanDateMeal
}

export function MealPlanDateMealDraggable({ mealPlanId, dateId, dateMeal }: Props) {
    const dispatch = useAppDispatch()

  const { recipe, servingCount } = dateMeal
  const { nutrition } = recipe

  const servingsRecipe = {
    ...recipe,
    nutrition: transformNutritionByServing(nutrition, servingCount)
  }

  const minServings = 1
  const maxServings = 100

  return (
    <div className="w-full flex flex-col bg-background transition-all duration-200 text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm leading-tight whitespace-nowrap">
      <div className="flex flex-row items-center gap-2">

        <button
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          className={`overflow-hidden border-b last:border-b-0 ${isDragging ? "z-100 rounded outline outline-black/10" : "first:rounded-t last:rounded-b"}`}
        >
          <MealPlanDateMealDraggable mealPlanId={mealPlanId} dateId={dateId} dateMeal={dateMeal} />
        </button>

        <GripVertical className="ml-4 opacity-50" />
        <div className="flex w-full flex-col items-start gap-2 pl-2 p-4">
          <Recipe {...servingsRecipe} />
        </div>
      </div>
      <div className="w-full py-2 flex items-center gap-2 justify-center bg-slate-200/50">
        <Button 
          size="sm" 
          variant="outline"
          className={`${servingCount > minServings ? "" : "opacity-50"} transition-all`}
          onClick={() => dispatch(mealPlanDateMealServingChanged({
            mealPlanId, 
            dateId, 
            mealId: dateMeal.id, 
            servingCount: Math.max(servingCount - 1, minServings)
          }))}
        ><Minus /></Button>
        <div>{servingCount} servings</div>
        <Button 
          size="sm" 
          variant="outline"
          className={`${servingCount < maxServings ? "" : "opacity-50"} transition-all`}
          onClick={() => dispatch(mealPlanDateMealServingChanged({
            mealPlanId,
            dateId,
            mealId: dateMeal.id,
            servingCount: Math.min(servingCount + 1, maxServings)
          }))}
        ><Plus /></Button>
      </div>
    </div>
  )
}
