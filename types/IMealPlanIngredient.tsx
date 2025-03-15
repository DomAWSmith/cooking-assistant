import { IRecipeIngredient } from "@/types/IRecipeIngredient"

export interface IMealPlanIngredient extends IRecipeIngredient {
    expiryDate?: number
}