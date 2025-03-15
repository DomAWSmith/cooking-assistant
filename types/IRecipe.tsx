export interface IRecipe {
    id: string
    name: string
    date: string
    ingredients: { id: string, quantity: number }[]
}