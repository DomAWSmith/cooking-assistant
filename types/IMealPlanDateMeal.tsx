export interface IMealPlanDateMeal {
    id: string
    recipeId: string
    // TODO - we should eventually instead store `recipe: IRecipe` so we are making a copy of a recipe at the time of adding - preventing recipe changes from messing up already created meal plans
    servingCount: number
}