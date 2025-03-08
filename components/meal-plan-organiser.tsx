import { IRecipe } from "@/types/IRecipe"
import { DndContext } from "@dnd-kit/core"
import MealDropperDropper from "@/components/meal-plan-organiser-dropper"
import MealPlanOrganiserDragger from "@/components/meal-plan-organiser-dragger"
import { useState } from "react"
import { MealType } from "@/types/enums/MealType"

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
                setBreakfastRecipeIds(toggleId(breakfastRecipeIds, recipeId))
                break
            case MealType.LUNCH:
                setLunchRecipeIds(toggleId(lunchRecipeIds, recipeId))
                break
            case MealType.BREAKFAST:
                setDinnerRecipeIds(toggleId(dinnerRecipeIds, recipeId))
                break
        }
    }

    const toggleId = (ids: string[], id: string) => {
        return ids.includes(id) ?
              ids.filter(_id => _id !== id)
            : [...ids, id]
    }

    const breakfastRecipes = recipes.filter(({ id }) => breakfastRecipeIds.includes(id))
    const lunchRecipes = recipes.filter(({ id }) => lunchRecipeIds.includes(id))
    const dinnerRecipes = recipes.filter(({ id }) => dinnerRecipeIds.includes(id))
    const unchosenRecipes = recipes

    return (
        <DndContext
            onDragEnd={handleDragEnd}
        >
            <div>
                <div className="mb-12">
                    <MealDropperDropper id={MealType.NONE}>
                        {unchosenRecipes.length > 0 ? (
                            unchosenRecipes.map(recipe => (
                                <MealPlanOrganiserDragger recipe={recipe} />
                            ))
                        ) : (
                            <div className="p-4 opacity-70">No meals chosen</div>
                        )}
                    </MealDropperDropper>
                </div>
                <div className="mb-4">
                    <h2 className="mb-1 font-semibold">Breakfast</h2>
                    <MealDropperDropper id={MealType.BREAKFAST}>
                        {breakfastRecipes.length > 0 ? (
                            breakfastRecipes.map(recipe => (
                                <MealPlanOrganiserDragger recipe={recipe} />
                            ))
                        ) : (
                            <div className="p-4 opacity-70">No meals chosen</div>
                        )}
                    </MealDropperDropper>
                </div>
                <div className="mb-4">
                    <h2 className="mb-1 font-semibold">Lunch</h2>
                    <MealDropperDropper id={MealType.LUNCH}>
                        {lunchRecipes.length > 0 ? (
                            lunchRecipes.map(recipe => (
                                <MealPlanOrganiserDragger recipe={recipe} />
                            ))
                        ) : (
                            <div className="p-4 opacity-70">No meals chosen</div>
                        )}
                    </MealDropperDropper>
                </div>
                <div className="mb-4">
                    <h2 className="mb-1 font-semibold">Dinner</h2>
                    <MealDropperDropper id={MealType.DINNER}>
                        {dinnerRecipes.length > 0 ? (
                            dinnerRecipes.map(recipe => (
                                <MealPlanOrganiserDragger recipe={recipe} />
                            ))
                        ) : (
                            <div className="p-4 opacity-70">No meals chosen</div>
                        )}
                    </MealDropperDropper>
                </div>
            </div>
        </DndContext>
    )
}
