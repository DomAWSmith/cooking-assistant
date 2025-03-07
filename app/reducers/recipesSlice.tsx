import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRecipe } from "@/types/IRecipe"

const initialState: IRecipe[] = []

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