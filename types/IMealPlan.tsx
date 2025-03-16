import { IMealPlanDate } from "@/types/IMealPlanDate"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"

export interface IMealPlan {
    id: string
    title: string
    startDate: number
    endDate: number

    dates: IMealPlanDate[]

    shoppingIngredients: IShoppingIngredient[]
}