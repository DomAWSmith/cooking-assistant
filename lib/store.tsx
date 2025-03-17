import { configureStore } from "@reduxjs/toolkit"
import recipesReducer from "@/app/reducers/recipesSlice"
import mealPlansReducer from "@/app/reducers/mealPlansSlice"
import ingredientsReducer from "@/app/reducers/ingredientsSlice"
import { listenerMiddleware } from "@/lib/middleware"
import { MEAL_PLAN_LOCALSTORAGE_KEY } from "@/lib/constants"

const mealPlansState = JSON.parse(typeof window !== "undefined" ? localStorage.getItem(MEAL_PLAN_LOCALSTORAGE_KEY) || "null" : "null")

export const makeStore = () => configureStore({
    preloadedState: {
        mealPlans: mealPlansState === null ? [] : mealPlansState
    },
    reducer: {
        recipes: recipesReducer,
        mealPlans: mealPlansReducer,
        ingredients: ingredientsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware)
})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]