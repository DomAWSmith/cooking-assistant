export interface IRecipe {
    id: string
    name: string
    date: string
    calories: number
    // TODO - move below into IMacros object
    carbs: number
    fats: number
    protein: number
}