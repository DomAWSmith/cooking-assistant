import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRecipe } from "@/types/IRecipe"

// const initialState: IRecipe[] = []
const initialState: IRecipe[] = [
    {
        "id": "1",
        "name": "Recipe 1",
        "date": "Yesterday",
        "nutrition": {
            "calories": 415,
            "macros": {
                "carbs": 15,
                "fats": 5.2,
                "protein": 10
            }
        }
    },
    {
        "id": "2",
        "name": "Recipe 2",
        "date": "A week ago",
        "nutrition": {
            "calories": 615,
            "macros": {
                "carbs": 5,
                "fats": 53.2,
                "protein": 20
            }
        }
    }
] // TODO: use real data

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        recipeAdded: (state, { payload }: PayloadAction<IRecipe>) => {
            state.push(payload)
        }
    }
})

export const { recipeAdded } = recipesSlice.actions
export default recipesSlice.reducer