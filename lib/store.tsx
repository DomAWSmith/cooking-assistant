import { configureStore } from "@reduxjs/toolkit"
import recipesReducer from "@/app/reducers/recipesSlice"
import mealPlansReducer from "@/app/reducers/mealPlansSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            recipes: recipesReducer,
            mealPlans: mealPlansReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]