import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "@/lib/store"
import {
    mealPlanAdded,
    mealPlanRenamed,
    mealPlanDeleted,
    mealPlanDateRangeChanged,
    mealPlanDateMealsAdded,
    mealPlanDateMealsMoved,
    mealPlanDateNoteChanged,
    mealPlanDateMealServingChanged,
    mealPlanShoppingListItemUpdated,
} from "@/app/reducers/mealPlansSlice"
import { MEAL_PLAN_LOCALSTORAGE_KEY } from "@/lib/constants"

export const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
    matcher: isAnyOf(
        mealPlanAdded,
        mealPlanRenamed,
        mealPlanDeleted,
        mealPlanDateRangeChanged,
        mealPlanDateMealsAdded,
        mealPlanDateMealsMoved,
        mealPlanDateNoteChanged,
        mealPlanDateMealServingChanged,
        mealPlanShoppingListItemUpdated
    ), // TODO - find a way to listen to all reducers of a slice
    effect: (_, listenerApi) =>
        localStorage.setItem(
            MEAL_PLAN_LOCALSTORAGE_KEY,
            JSON.stringify((listenerApi.getState() as RootState).mealPlans)
        )
})
