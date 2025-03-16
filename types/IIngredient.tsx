import { INutrition } from "@/types/INutrition"
import { IIngredientType } from "@/types/IIngredientType"

export interface IIngredient {
    id: string
    name: string
    nutrition: INutrition
    type: IIngredientType // aisle
    // servingSize: number // to default to when adding to recipe? e.g. pack?
}