import { INutrition } from "@/types/INutrition"
import { IRecipeIngredient } from "@/types/IRecipeIngredient"

export interface IRecipe {
    id: string
    name: string
    date: string
    nutrition: INutrition
    ingredients: IRecipeIngredient[]
}