import { useDraggable } from "@dnd-kit/core"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { buttonVariants } from "@/components/ui/button"
import { Recipe } from "@/components/recipe"
import { GripVertical } from "lucide-react"
import { getRecipeNutritionByServing } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { mealPlanDateMealServingChanged } from "@/app/reducers/mealPlansSlice"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"
import { IMealPlan } from "@/types/IMealPlan"

interface Props {
    mealPlan: IMealPlan
    dateId: string
    dateMeal: IMealPlanDateMeal
    availableIngredients: IShoppingIngredient[]
}

export default function MealPlanOrganiserDragger({ mealPlan, dateId, dateMeal, availableIngredients }: Props) {
    const dispatch = useAppDispatch()

    const recipes = useAppSelector(state => state.recipes)
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

    const changeServingCount = (newServingCount: number) => {
        // adjust unchecked items first 
        // so items that have been checked are less likely to become "invalidated"
        // e.g. user ticked that they have 10g of something which now needs to be 20g)
        let newShoppingIngredients = [...mealPlan.shoppingIngredients]
            .sort((a, b) => (a.isChecked === b.isChecked) ? 0 : a.isChecked ? 1 : -1)

        mealPlan.dates.forEach(date => {
            if (date.id !== dateId) return

            date.meals.forEach(({ id, recipeId }) => {
                if (id !== dateMeal.id) return
                
                const recipe = recipes.find(recipe => recipe.id === recipeId)
                if (!recipe) return []

                const oldServingCount = dateMeal.servingCount

                // update shopping ingredients 
                // by finding matching ingredients and changing their old quantity requirements to the new quantity requirements
                recipe.ingredients
                    .map(({ id: ingredientId, quantity }) => {
                        let recipeIngredientUpdated = false

                        newShoppingIngredients = newShoppingIngredients
                            .map(ingredient => {
                                if (ingredient.ingredientId !== ingredientId) return ingredient
                                if (ingredient.quantity !== quantity * oldServingCount) return ingredient
                                if (recipeIngredientUpdated) return ingredient

                                recipeIngredientUpdated = true
                                return {
                                    ...ingredient,
                                    quantity: quantity * newServingCount
                                }
                            })
                            .filter(ingredient => ingredient.quantity > 0)
                    })
            })
        })

        dispatch(mealPlanDateMealServingChanged({
            mealPlanId: mealPlan.id,
            dateId,
            mealId: dateMeal.id,
            servingCount: newServingCount,
            shoppingIngredients: newShoppingIngredients
        }))
    }

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
                        className={`${buttonVariants({ variant: "ghost", className: "h-auto rounded-none touch-none transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" })} `}
                    >
                        <GripVertical className="opacity-50 ml-4 mr-2" />
                    </button>

                    <div className="flex w-full flex-col items-start gap-2 pl-1 p-4">
                        <Recipe 
                            recipe={servingsRecipe} 
                            mealData={{
                                dateId,
                                availableIngredients,
                                serving: {
                                    count: servingCount,
                                    min: minServings,
                                    max: maxServings,
                                    onDecrement: () => changeServingCount(Math.max(servingCount - 1, minServings)),
                                    onIncrement: () => changeServingCount(Math.min(servingCount + 1, maxServings))
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
