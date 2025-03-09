import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMealPlan } from "@/types/IMealPlan"
import { addDays } from "date-fns"

const lastMonth = addDays(new Date(), -30)
lastMonth.setHours(0, 0, 0, 0)
const lastWeek = addDays(new Date(), -7)
lastWeek.setHours(0, 0, 0, 0)
const yesterday = addDays(new Date(), -1)
yesterday.setHours(0, 0, 0, 0)
const tomorrow = addDays(new Date(), 1)
tomorrow.setHours(0, 0, 0, 0)
const nextWeek = addDays(new Date(), 7)
nextWeek.setHours(0, 0, 0, 0)

// const initialState: IMealPlan[] = []
const initialState: IMealPlan[] = [
    {
        "id": "1",
        "title": "Meal plan 1",
        "startDate": yesterday.getTime(),
        "endDate": nextWeek.getTime(),
        "mealCount": 5,
        "currentIngredientCount": 4,
        "totalIngredientCount": 10
    },
    {
        "id": "2",
        "title": "Meal plan 2",
        "startDate": tomorrow.getTime(),
        "endDate": nextWeek.getTime(),
        "mealCount": 3,
        "currentIngredientCount": 0,
        "totalIngredientCount": 1
    },
    {
        "id": "3",
        "title": "Meal plan 3",
        "startDate": lastWeek.getTime(),
        "endDate": yesterday.getTime(),
        "mealCount": 4,
        "currentIngredientCount": 3,
        "totalIngredientCount": 6
    },
    {
        "id": "4",
        "title": "Meal plan 4",
        "startDate": lastMonth.getTime(),
        "endDate": lastWeek.getTime(),
        "mealCount": 4,
        "currentIngredientCount": 0,
        "totalIngredientCount": 11
    }
] // TODO: use real data

const mealPlansSlice = createSlice({
    name: "mealPlans",
    initialState,
    reducers: {
        mealPlanAdded: (state, { payload }: PayloadAction<IMealPlan>) => {
            state.push(payload)
        },
        mealPlanRenamed: (state, { payload: { id, title } }: PayloadAction<{ id: string, title: string }>) => {
            return state.map(mealPlan => mealPlan.id === id ? {
                ...mealPlan,
                title,
            } : mealPlan)
        },
        mealPlanDateRangeChanged: (state, { payload: { id, startDate, endDate } }: PayloadAction<{ id: string, startDate: number, endDate: number }>) => {
            return state.map(mealPlan => mealPlan.id === id ? {
                ...mealPlan,
                startDate,
                endDate,
            } : mealPlan)
        },
    }
})

export const { mealPlanAdded, mealPlanRenamed, mealPlanDateRangeChanged } = mealPlansSlice.actions
export default mealPlansSlice.reducer