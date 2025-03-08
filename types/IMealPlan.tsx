export interface IMealPlan {
    id: string
    name: string
    startDate: Date
    endDate: Date
    mealCount: number
    currentIngredientCount: number
    totalIngredientCount: number
}