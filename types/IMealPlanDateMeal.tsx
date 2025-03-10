import { IRecipe } from "@/types/IRecipe"

export interface IMealPlanDateMeal {
    id: string
    recipeId: string
    recipe: IRecipe
    servingCount: number
}