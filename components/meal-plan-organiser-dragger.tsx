import { useDraggable } from "@dnd-kit/core"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { Recipe } from "@/components/recipe"
import { GripVertical, Minus, Plus, Trash2 } from "lucide-react"
import { transformNutritionByServing } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/hooks"
import { mealPlanDateMealServingChanged } from "@/app/reducers/mealPlansSlice"

interface Props {
    mealPlanId: string
    dateId: string
    dateMeal: IMealPlanDateMeal
}

export default function MealPlanOrganiserDragger({ mealPlanId, dateId, dateMeal }: Props) {
    const dispatch = useAppDispatch()

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: dateMeal.id,
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined


    const { recipe, servingCount } = dateMeal
    const { nutrition } = recipe

    const servingsRecipe = {
        ...recipe,
        nutrition: transformNutritionByServing(nutrition, servingCount)
    }

    const minServings = 0
    const maxServings = 100
    const canDelete = servingCount <= minServings + 1

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`overflow-hidden border-b last:border-b-0 ${isDragging ? "z-100 rounded outline outline-black/10" : "first:rounded-t"}`}
        >
            <div 
                className="flex flex-col bg-background transition-all duration-200 text-sidebar-accent-foreground  text-sm leading-tight whitespace-nowrap"
            >
                <div className="flex flex-row gap-2">
                    <button
                        {...listeners}
                        {...attributes}
                        className="touch-none transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground pr-2"
                    >
                        <GripVertical className="ml-4 opacity-50" />
                    </button>

                    <div className="flex w-full flex-col items-start gap-2 pl-1 p-4">
                        <Recipe separateNutrition={false} recipe={servingsRecipe} />
                        <div className="w-full py-2 flex items-center gap-2 justify-start">
                            <Button
                                size="sm"
                                variant="outline"
                                className={canDelete ? "text-destructive-foreground" : ""}
                                onClick={() => dispatch(mealPlanDateMealServingChanged({
                                    mealPlanId,
                                    dateId,
                                    mealId: dateMeal.id,
                                    servingCount: Math.max(servingCount - 1, minServings)
                                }))}
                            >
                                {canDelete ? <Trash2 /> : <Minus />}
                            </Button>
                            <div className="px-2">{servingCount} {`${servingCount === 1 ? "serving" : "servings"}`}</div>
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
                </div>
            </div>
        </div>
    )
}
