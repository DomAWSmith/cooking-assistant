import { INutrition } from "@/types/INutrition"

export interface IRecipe {
    id: string
    name: string
    date: string
    nutrition: INutrition
}