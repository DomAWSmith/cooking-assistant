import { IRecipe } from "@/types/IRecipe"
import { DndContext } from "@dnd-kit/core"
import MealDropperDropper from "@/components/meal-plan-organiser-dropper"
import MealPlanOrganiserDragger from "@/components/meal-plan-organiser-dragger"
import { useState } from "react"
import { MealType } from "@/types/enums/MealType"
import { RecipesPickerDialog } from "./recipes-picker-dialog"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { getMealTypeTitle, getUniqueArray } from "@/lib/utils"

interface Props {
    recipes: IRecipe[]
}

export default function MealPlanOrganiser({ recipes }: Props) {
    const [selectingMealType, setSelectingMealType] = useState<MealType | null>(null)

    const [breakfastRecipeIds, setBreakfastRecipeIds] = useState<string[]>([])
    const [lunchRecipeIds, setLunchRecipeIds] = useState<string[]>([])
    const [dinnerRecipeIds, setDinnerRecipeIds] = useState<string[]>([])

    function handleDragEnd(event: any) {
        const { active, over } = event
        const { id: mealId } = over
        const { id: recipeId } = active

        switch (mealId) {
            case MealType.BREAKFAST:
                setBreakfastRecipeIds(getUniqueArray([...breakfastRecipeIds, recipeId]))
                setLunchRecipeIds(lunchRecipeIds.filter(i => i !== recipeId))
                setDinnerRecipeIds(dinnerRecipeIds.filter(i => i !== recipeId))
                break
            case MealType.LUNCH:
                setBreakfastRecipeIds(breakfastRecipeIds.filter(i => i !== recipeId))
                setLunchRecipeIds(getUniqueArray([...lunchRecipeIds, recipeId]))
                setDinnerRecipeIds(dinnerRecipeIds.filter(i => i !== recipeId))
                break
            case MealType.DINNER:
                setBreakfastRecipeIds(breakfastRecipeIds.filter(i => i !== recipeId))
                setLunchRecipeIds(lunchRecipeIds.filter(i => i !== recipeId))
                setDinnerRecipeIds(getUniqueArray([...dinnerRecipeIds, recipeId]))
                break
        }
    }

    const breakfastRecipes = recipes.filter(({ id }) => breakfastRecipeIds.includes(id))
    const lunchRecipes = recipes.filter(({ id }) => lunchRecipeIds.includes(id))
    const dinnerRecipes = recipes.filter(({ id }) => dinnerRecipeIds.includes(id))

    let selectedMealTypeTitle = ""
    let selectedRecipeIds: string[] = []
    switch (selectingMealType) {
        case MealType.BREAKFAST:
            selectedMealTypeTitle = "breakfast"
            selectedRecipeIds = [...breakfastRecipeIds]
            break
        case MealType.LUNCH:
            selectedMealTypeTitle = "lunch"
            selectedRecipeIds = [...lunchRecipeIds]
            break
        case MealType.DINNER:
            selectedMealTypeTitle = "dinner"
            selectedRecipeIds = [...dinnerRecipeIds]
            break                        
    }

    // TODO - change droppable areas to days within the meal plan range
    // TODO - allow duplicates of the same recipe in the meal plan

    return (
        <>
            <RecipesPickerDialog
                isOpen={selectingMealType !== null}
                setIsOpen={(isOpen) => {
                    if (isOpen) return false
                    setSelectingMealType(null)
                }}
                title={`Add to ${selectingMealType ? getMealTypeTitle(selectingMealType).toLocaleLowerCase() : "meal"}`}
                recipeIds={selectedRecipeIds}
                onSave={(recipeIds) => {
                    switch (selectingMealType) {
                        case MealType.BREAKFAST:
                            setBreakfastRecipeIds(recipeIds)
                            break
                        case MealType.LUNCH:
                            setLunchRecipeIds(recipeIds)
                            break
                        case MealType.DINNER:
                            setDinnerRecipeIds(recipeIds)
                            break
                    }
                }}
            />
        
            <DndContext
                onDragEnd={handleDragEnd}
            >
                <div>
                    <div className="mb-8">
                        <div className="mb-2 flex items-end justify-between">
                            <h2 className="text-lg font-semibold mr-2">Breakfast</h2>
                        </div>
                        <MealDropperDropper id={MealType.BREAKFAST} isPopulated={breakfastRecipeIds.length > 0}>
                            {breakfastRecipes.map(recipe => (
                                <MealPlanOrganiserDragger key={recipe.id} recipe={recipe} />
                            ))}
                        </MealDropperDropper>
                        <div className="w-full border border-t-0 rounded-b">
                            <Button
                                onClick={() => setSelectingMealType(MealType.BREAKFAST)}
                                variant="ghost"
                                className="w-full"
                            >
                                <Plus />
                            </Button>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 flex items-end justify-between">
                            <h2 className="text-lg font-semibold mr-2">Lunch</h2>
                        </div>
                        <MealDropperDropper id={MealType.LUNCH} isPopulated={lunchRecipeIds.length > 0}>
                            {lunchRecipes.map(recipe => (
                                <MealPlanOrganiserDragger key={recipe.id} recipe={recipe} />
                            ))}
                        </MealDropperDropper>
                        <div className="w-full border border-t-0 rounded-b">
                            <Button
                                onClick={() => setSelectingMealType(MealType.LUNCH)}
                                variant="ghost"
                                className="w-full"
                            >
                                <Plus />
                            </Button>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 flex items-end justify-between">
                            <h2 className="text-lg font-semibold mr-2">Dinner</h2>
                        </div>
                        <MealDropperDropper id={MealType.DINNER} isPopulated={dinnerRecipeIds.length > 0}>
                            {dinnerRecipes.map(recipe => (
                                <MealPlanOrganiserDragger key={recipe.id} recipe={recipe} />
                            ))}
                        </MealDropperDropper>
                        <div className="w-full border border-t-0 rounded-b">
                            <Button
                                onClick={() => setSelectingMealType(MealType.DINNER)}
                                variant="ghost"
                                className="w-full"
                            >
                                <Plus />
                            </Button>
                        </div>
                    </div>
                </div>
            </DndContext>
        </>
    )
}
