import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRecipe } from "@/types/IRecipe"

// const initialState: IRecipe[] = []
const initialState: IRecipe[] = [
    {
        "id": "1",
        "name": "Recipe 1",
        "date": "Yesterday",
        "ingredients": [
            {
                "id": "1",
                "quantity": 2,
            },
            {
                "id": "2",
                "quantity": 1,
            }
        ]
    },
    {
        "id": "2",
        "name": "Recipe 2",
        "date": "A week ago",
        "ingredients": [
            {
                "id": "1",
                "quantity": 2,
            }
        ]
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