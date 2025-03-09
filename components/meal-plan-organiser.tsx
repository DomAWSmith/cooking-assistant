import { IRecipe } from "@/types/IRecipe"
import { DndContext } from "@dnd-kit/core"
import MealDropperDropper from "@/components/meal-plan-organiser-dropper"
import MealPlanOrganiserDragger from "@/components/meal-plan-organiser-dragger"
import { useState } from "react"
import { MealType } from "@/types/enums/MealType"
import { RecipesPicker } from "./recipes-picker"

interface Props {
    recipes: IRecipe[]
}

export default function MealPlanOrganiser({ recipes }: Props) {
    const [breakfastRecipeIds, setBreakfastRecipeIds] = useState<string[]>([])
    const [lunchRecipeIds, setLunchRecipeIds] = useState<string[]>([])
    const [dinnerRecipeIds, setDinnerRecipeIds] = useState<string[]>([])

    function handleDragEnd(event: any) {
        const { active, over } = event
        const { id: mealId } = over
        const { id: recipeId } = active

        switch (mealId) {
            case MealType.BREAKFAST:
                setBreakfastRecipeIds([...breakfastRecipeIds, recipeId])
                setLunchRecipeIds(lunchRecipeIds.filter(i => i !== recipeId))
                setDinnerRecipeIds(dinnerRecipeIds.filter(i => i !== recipeId))
                break
            case MealType.LUNCH:
                setBreakfastRecipeIds(breakfastRecipeIds.filter(i => i !== recipeId))
                setLunchRecipeIds([...lunchRecipeIds, recipeId])
                setDinnerRecipeIds(dinnerRecipeIds.filter(i => i !== recipeId))
                break
            case MealType.DINNER:
                setBreakfastRecipeIds(breakfastRecipeIds.filter(i => i !== recipeId))
                setLunchRecipeIds(lunchRecipeIds.filter(i => i !== recipeId))
                setDinnerRecipeIds([...dinnerRecipeIds, recipeId])
                break
        }
    }

    const breakfastRecipes = recipes.filter(({ id }) => breakfastRecipeIds.includes(id))
    const lunchRecipes = recipes.filter(({ id }) => lunchRecipeIds.includes(id))
    const dinnerRecipes = recipes.filter(({ id }) => dinnerRecipeIds.includes(id))

    return (
        <DndContext
            onDragEnd={handleDragEnd}
        >
            <div>
                <div className="mb-8">
                    <div className="mb-2 flex items-end justify-between">
                        <h2 className="text-lg font-semibold mr-2">Breakfast</h2>
                        <RecipesPicker 
                            recipeIds={breakfastRecipeIds}
                            onSave={(recipeIds) => setBreakfastRecipeIds(recipeIds)}
                        />
                    </div>
                    <MealDropperDropper id={MealType.BREAKFAST} isPopulated={breakfastRecipeIds.length > 0}>
                        {breakfastRecipes.map(recipe => (
                            <MealPlanOrganiserDragger key={recipe.id} recipe={recipe} />
                        ))}
                    </MealDropperDropper>
                </div>
                <div className="mb-8">
                    <div className="mb-2 flex items-end justify-between">
                        <h2 className="text-lg font-semibold mr-2">Lunch</h2>
                        <RecipesPicker 
                            recipeIds={lunchRecipeIds}
                            onSave={(recipeIds) => setLunchRecipeIds(recipeIds)}
                        />
                    </div>
                    <MealDropperDropper id={MealType.LUNCH} isPopulated={lunchRecipeIds.length > 0}>
                        {lunchRecipes.map(recipe => (
                            <MealPlanOrganiserDragger key={recipe.id} recipe={recipe} />
                        ))}
                    </MealDropperDropper>
                </div>
                <div className="mb-8">
                    <div className="mb-2 flex items-end justify-between">
                        <h2 className="text-lg font-semibold mr-2">Dinner</h2>
                        <RecipesPicker 
                            recipeIds={dinnerRecipeIds}
                            onSave={(recipeIds) => setDinnerRecipeIds(recipeIds)}
                        />
                    </div>
                    <MealDropperDropper id={MealType.DINNER} isPopulated={dinnerRecipeIds.length > 0}>
                        {dinnerRecipes.map(recipe => (
                            <MealPlanOrganiserDragger key={recipe.id} recipe={recipe} />
                        ))}
                    </MealDropperDropper>
                </div>
            </div>
        </DndContext>
    )
}
