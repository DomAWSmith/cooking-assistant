import { CheckedState } from "@/types/enums/CheckedState"

export interface IShoppingIngredient {
    id: string
    ingredientId: string
    checkedState: CheckedState
    expiryDate?: number
    quantity: number
}