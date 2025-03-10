import { IRecipe } from "@/types/IRecipe"
import { DndContext } from "@dnd-kit/core"
import MealDropperDropper from "@/components/meal-plan-organiser-dropper"
import MealPlanOrganiserDragger from "@/components/meal-plan-organiser-dragger"
import { useState } from "react"
import { RecipesPickerDialog } from "./recipes-picker-dialog"
import { Button } from "./ui/button"
import { Flame, Plus } from "lucide-react"
import { formatNutritionNumber, getAmountOfDaysBetween, getDateFromDateId, getDateId, getUniqueArray, transformNutritionByServing } from "@/lib/utils"
import { Macros } from "./macros"
import { addDays, isToday } from "date-fns"
import { IMealPlan } from "@/types/IMealPlan"
import { useAppDispatch } from "@/lib/hooks"
import { mealPlanDateMealsChanged } from "@/app/reducers/mealPlansSlice"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { Badge } from "./ui/badge"
import { INutrition } from "@/types/INutrition"

interface Props {
    mealPlan: IMealPlan
    recipes: IRecipe[]
}

export default function MealPlanOrganiser({ mealPlan, recipes }: Props) {
    const dispatch = useAppDispatch()

    const [lastDateMealId, setLastDateMealId] = useState(0)
    const [selectingDateId, setSelectingDateId] = useState<string | null>(null)

    const startDate = new Date(mealPlan.startDate)
    const endDate = new Date(mealPlan.endDate)

    function handleDragEnd(event: any) {
        const { active, over } = event
        const { id: dateId } = over
        const { id: dateMealId } = active

        const newMealPlanDate = mealPlan.dates.find(({ id }) => id === dateId) || {
            id: dateId,
            meals: []
        }
        const oldMealPlanDate = mealPlan.dates.find(date => date.meals.map(({ id }) => id).includes(dateMealId))
        const dateMeal = (oldMealPlanDate?.meals || []).find(({ id }) => id === dateMealId)

        if (!oldMealPlanDate || !dateMeal) return
        if (oldMealPlanDate.id === newMealPlanDate.id) return

        // Remove date meal from old date
        dispatch(mealPlanDateMealsChanged({
            mealPlanId: mealPlan.id,
            dateId: oldMealPlanDate.id,
            meals: oldMealPlanDate?.meals.filter(({ id }) => id !== dateMealId)
        }))

        // Add date meal to new date
        dispatch(mealPlanDateMealsChanged({
            mealPlanId: mealPlan.id,
            dateId: newMealPlanDate.id,
            meals: [...newMealPlanDate.meals, dateMeal]
        }))
    }

    const prettyDateFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "long" })
    const dayCount = getAmountOfDaysBetween(startDate, endDate)
    let dates: Date[] = []
    for (let i = 0; i <= dayCount; i++) dates.push(addDays(mealPlan.startDate, i))

    return (
        <>
            <RecipesPickerDialog
                isOpen={selectingDateId !== null}
                setIsOpen={(isOpen) => {
                    if (isOpen) return false
                    setSelectingDateId(null)
                }}
                title={`Add to ${selectingDateId ? prettyDateFormatter.format(getDateFromDateId(selectingDateId)) : ""} meal`}
                onSave={(recipeIds) => {
                    if (selectingDateId === null) return

                    let dateMealId = lastDateMealId

                    let meals: IMealPlanDateMeal[] = []
                    recipeIds.forEach(recipeId => {
                        const recipe = recipes.find(({ id }) => id === recipeId)
                        if (!recipe) return

                        dateMealId++

                        meals.push({
                            id: dateMealId.toString(),
                            recipeId,
                            recipe,
                            servingCount: 2 // TODO - make default configurable
                        })
                    })

                    setLastDateMealId(dateMealId)

                    const dateMeals = mealPlan.dates.find(date => date.id === selectingDateId)?.meals || []
                    dispatch(mealPlanDateMealsChanged({ 
                        mealPlanId: mealPlan.id, 
                        dateId: selectingDateId, 
                        meals: [...dateMeals, ...meals]
                    }))
                }}
            />
        
            <DndContext
                onDragEnd={handleDragEnd}
            >
                {dates.map(date => {
                    const dateId = getDateId(date)
                    const dateMeals = mealPlan.dates.find(date => date.id === dateId)?.meals || []

                    const nutrition: INutrition = dateMeals
                        .reduce((prev, curr) => {
                            const mealNutrition = transformNutritionByServing(curr.recipe.nutrition, curr.servingCount)                            

                            return {
                                calories: prev.calories + mealNutrition.calories,
                                macros: {
                                    protein: prev.macros.protein + mealNutrition.macros.protein,
                                    fats: prev.macros.fats + mealNutrition.macros.fats,
                                    carbs: prev.macros.carbs + mealNutrition.macros.carbs,
                                }
                            }
                        }, {
                            calories: 0,
                            macros: {
                                protein: 0,
                                fats: 0,
                                carbs: 0
                            }
                        })

                    return (
                        <div key={dateId} className="mb-8">
                            <div className="mb-2 flex items-end justify-between">
                                <div className="flex mr-2 gap-3 items-center">
                                    {isToday(date) && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                                    <h2 className="text-lg font-semibold">{prettyDateFormatter.format(date)}</h2>
                                </div>
                                {dateMeals.length > 0 && (
                                    <div className="mr-4 ml-auto">
                                        <div className="flex gap-2 justify-end">
                                            <Badge className="font-mono font-light" variant="outline">{formatNutritionNumber(nutrition.calories)} <Flame /></Badge>
                                            <Macros macros={nutrition.macros} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <MealDropperDropper id={dateId} isPopulated={dateMeals.length > 0}>
                                {dateMeals.map(dateMeal => (
                                    <MealPlanOrganiserDragger 
                                        key={dateMeal.id} 
                                        mealPlanId={mealPlan.id}
                                        dateId={dateId}
                                        dateMeal={dateMeal} 
                                    />
                                ))}
                            </MealDropperDropper>
                            <div className="w-full border border-t-0 rounded-b">
                                <Button
                                    onClick={() => setSelectingDateId(dateId)}
                                    variant="ghost"
                                    className="w-full rounded-t-none rounded-b"
                                >
                                    <Plus />
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </DndContext>
        </>
    )
}
