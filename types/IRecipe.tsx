import { INutrition } from "@/types/INutrition"
import { IIngredient } from "@/types/IIngredient"

export interface IRecipe {
    id: string
    name: string
    date: string
    nutrition: INutrition
    ingredients: IIngredient[]
}