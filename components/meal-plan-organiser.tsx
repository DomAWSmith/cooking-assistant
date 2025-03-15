import { IRecipe } from "@/types/IRecipe"
import { DndContext } from "@dnd-kit/core"
import MealDropperDropper from "@/components/meal-plan-organiser-dropper"
import MealPlanOrganiserDragger from "@/components/meal-plan-organiser-dragger"
import { useState } from "react"
import { RecipesPickerDialog } from "./recipes-picker-dialog"
import { Button } from "./ui/button"
import { Flame, Plus } from "lucide-react"
import { formatNutritionNumber, getDateFromDateId, getDateId, getRecipeNutritionByServing, weekDayFormatter } from "@/lib/utils"
import { Macros } from "./macros"
import { addDays, isToday } from "date-fns"
import { IMealPlan } from "@/types/IMealPlan"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { mealPlanDateMealsChanged, mealPlanDateNoteChanged } from "@/app/reducers/mealPlansSlice"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { Badge } from "./ui/badge"
import { INutrition } from "@/types/INutrition"
import { MealPlanDateNoteDialog } from "@/components/meal-plan-date-note-dialog"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"

interface Props {
    mealPlan: IMealPlan
    recipes: IRecipe[]
}

interface IMealPlanDateWithAvailableIngredients extends IMealPlanDateMeal {
    availableIngredients: IShoppingIngredient[]
}

export default function MealPlanOrganiser({ mealPlan, recipes }: Props) {
    const dispatch = useAppDispatch()

    const ingredients = useAppSelector(state => state.ingredients)
    
    const [lastDateMealId, setLastDateMealId] = useState(0)
    const [selectingDateId, setSelectingDateId] = useState<string | null>(null)

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

    // TODO - make an editable list and load it here
    let shoppingIngredients: IShoppingIngredient[] = ([
        {
            id: "1",
            ingredientId: "2",
            expiryDate: addDays(new Date(mealPlan.startDate), 1).getTime(),
            quantity: 10
        }
    ] as IShoppingIngredient[])// TODO - remove `as` once we're reading from a source
        .sort((a, b) => (a.expiryDate || 0) - (b.expiryDate || 0))

    let mealDates: { 
        date: Date, 
        mealDate?: {
            id: string
            meals: IMealPlanDateWithAvailableIngredients[]
            note?: string
        },
        nutrition: INutrition
    }[] = []

    mealPlan.dates.forEach(mealDate => {
        let nutrition: INutrition = {
            calories: 0,
            macros: {
                protein: 0,
                fats: 0,
                carbs: 0
            }
        }

        let meals: IMealPlanDateWithAvailableIngredients[] = []
        mealDate.meals.forEach(({ id, recipeId, servingCount }) => {
            const recipe = recipes.find(({ id }) => id === recipeId)
            if (!recipe) return

            let availableIngredients: IShoppingIngredient[] = []

            // total up nutrition
            const mealNutrition = getRecipeNutritionByServing(recipe, ingredients, servingCount)
            nutrition = {
                calories: nutrition.calories + mealNutrition.calories,
                macros: {
                    protein: nutrition.macros.protein + mealNutrition.macros.protein,
                    fats: nutrition.macros.fats + mealNutrition.macros.fats,
                    carbs: nutrition.macros.carbs + mealNutrition.macros.carbs,
                }
            }

            // subtract from ingredients for each day and it's meals by serving
            shoppingIngredients = shoppingIngredients.map(shoppingIngredient => {
                const _shoppingIngredient = { ...shoppingIngredient }

                recipe.ingredients.forEach(recipeIngredient => {
                    if (shoppingIngredient.id !== recipeIngredient.id) return

                    const shoppingIngredientCount = shoppingIngredient.quantity
                    const recipeIngredientQtyReq = recipeIngredient.quantity * servingCount
                    const ingredientQtyUsed = Math.min(shoppingIngredientCount, recipeIngredientQtyReq)
                    const shoppingIngredientQtyLeft = shoppingIngredientCount - recipeIngredientQtyReq

                    availableIngredients.push({
                        id: shoppingIngredient.id,
                        ingredientId: recipeIngredient.id,
                        quantity: ingredientQtyUsed,
                        expiryDate: shoppingIngredient.expiryDate,
                    })

                    _shoppingIngredient.quantity = shoppingIngredientQtyLeft

                })

                return _shoppingIngredient
            })

            meals.push({
                id,
                recipeId,
                servingCount,
                availableIngredients
            })
        })

        // provide date with it's nutrition and ingredient amounts 
        mealDates.push({
            date: getDateFromDateId(mealDate.id),
            mealDate: {
                id: mealDate.id,
                meals,
                note: mealDate.id,
            },
            nutrition
        })
    })

    return (
        <>
            <RecipesPickerDialog
                isOpen={selectingDateId !== null}
                setIsOpen={(isOpen) => {
                    if (isOpen) return false
                    setSelectingDateId(null)
                }}
                title="Add to meal"
                onSave={(recipeIds) => {
                    if (selectingDateId === null) return

                    let dateMealId = lastDateMealId

                    let meals: IMealPlanDateMeal[] = []
                    recipeIds.forEach(recipeId => {
                        dateMealId++

                        meals.push({
                            id: crypto.randomUUID(),
                            recipeId,
                            servingCount: 2, // TODO - make default configurable
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
                <div className="max-w-2xl">
                    {mealDates.map(({ date, mealDate, nutrition }) => {
                        const dateId = getDateId(date)
                        const dateMeals = mealDate?.meals || []
                        const dateNote = mealDate?.note || ""

                        return (
                            <div key={dateId} className="mb-8">
                                <div className="mb-2 flex flex-col justify-between lg:flex-row lg:items-end">
                                    <div className="flex flex-col">
                                        <div className="flex mr-2 gap-2 items-center">
                                            {isToday(date) && <div className="w-2 h-2  mr-1 bg-green-500 rounded-full animate-pulse" />}
                                            <h2 className="text-lg font-semibold">{weekDayFormatter.format(date)}</h2>
                                            <MealPlanDateNoteDialog 
                                                originalNote={dateNote}
                                                onSave={(note => {
                                                    dispatch(mealPlanDateNoteChanged({ mealPlanId: mealPlan.id, dateId, note }))
                                                })}
                                            />
                                        </div>
                                        {dateNote && (
                                            <div className="italic text-sm opacity-70">
                                                {dateNote}
                                            </div>
                                        )}
                                    </div>
                                    {dateMeals.length > 0 && (
                                        <div className="ml-auto mt-2">
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
                                            availableIngredients={dateMeal.availableIngredients}
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
                </div>
            </DndContext>
        </>
    )
}
