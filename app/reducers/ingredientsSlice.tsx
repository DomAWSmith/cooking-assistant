import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IIngredient } from "@/types/IIngredient"

const initialState: IIngredient[] = [
    {
        "id": "1",
        "name": "Greek yoghurt",
        "nutrition": {
            "calories": 10,
            "macros": {
                "carbs": 10,
                "fats": 10,
                "protein": 10,
            }
        },
        "type": "Dairy"
    },
    {
        "id": "2",
        "name": "Mincemeat",
        "nutrition": {
            "calories": 1,
            "macros": {
                "carbs": 1,
                "fats": 1,
                "protein": 1,
            }
        },
        "type": "Meat"
    }
] // TODO: use real data

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        ingredientAdded: (state, { payload }: PayloadAction<IIngredient>) => {
            state.push(payload)
        }
    }
})

export const { ingredientAdded } = ingredientsSlice.actions
export default ingredientsSlice.reducer