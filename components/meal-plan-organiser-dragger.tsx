import { useDraggable } from "@dnd-kit/core"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { Recipe } from "@/components/recipe"
import { GripVertical } from "lucide-react"
import { getRecipeNutritionByServing } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { mealPlanDateMealServingChanged } from "@/app/reducers/mealPlansSlice"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"

interface Props {
    mealPlanId: string
    dateIngredients: IShoppingIngredient[]
    dateId: string
    dateMeal: IMealPlanDateMeal
}

export default function MealPlanOrganiserDragger({ mealPlanId, dateIngredients, dateId, dateMeal }: Props) {
    const dispatch = useAppDispatch()

    const ingredients = useAppSelector(state => state.ingredients)

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: dateMeal.id,
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    const { recipeId, servingCount } = dateMeal
    const recipe = useAppSelector(state => state.recipes.find(({ id }) => id === recipeId))
    if (!recipe) return null

    const servingsRecipe = {
        ...recipe,
        nutrition: getRecipeNutritionByServing(recipe, ingredients, servingCount)
    }

    const minServings = 0
    const maxServings = 100

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
                        className="touch-none transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground pl-4 pr-2"
                    >
                        <GripVertical className="opacity-50" />
                    </button>

                    <div className="flex w-full flex-col items-start gap-2 pl-1 p-4">
                        <Recipe 
                            recipe={servingsRecipe} 
                            mealData={{
                                dateId,
                                dateIngredients,
                                serving: {
                                    count: servingCount,
                                    min: minServings,
                                    max: maxServings,
                                    onDecrement: () => {
                                        dispatch(mealPlanDateMealServingChanged({
                                            mealPlanId,
                                            dateId,
                                            mealId: dateMeal.id,
                                            servingCount: Math.max(servingCount - 1, minServings)
                                        }))
                                    },
                                    onIncrement: () => {
                                        dispatch(mealPlanDateMealServingChanged({
                                            mealPlanId,
                                            dateId,
                                            mealId: dateMeal.id,
                                            servingCount: Math.min(servingCount + 1, maxServings)
                                        }))
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
