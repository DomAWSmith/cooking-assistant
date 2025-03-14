import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addDays } from "date-fns"
import { IMealPlan } from "@/types/IMealPlan"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"

const lastMonth = addDays(new Date(), -30)
lastMonth.setHours(0, 0, 0, 0)
const lastWeek = addDays(new Date(), -7)
lastWeek.setHours(0, 0, 0, 0)
const yesterday = addDays(new Date(), -1)
yesterday.setHours(0, 0, 0, 0)
const today = new Date()
today.setHours(0, 0, 0, 0)
const tomorrow = addDays(new Date(), 1)
tomorrow.setHours(0, 0, 0, 0)
const nextWeek = addDays(new Date(), 6)
nextWeek.setHours(0, 0, 0, 0)
const nextMonth = addDays(new Date(), 30)
nextMonth.setHours(0, 0, 0, 0)

// const initialState: IMealPlan[] = []
const initialState: IMealPlan[] = [
    {
        "id": "1",
        "title": "Meal plan 1",
        "startDate": yesterday.getTime(),
        "endDate": addDays(yesterday, 2).getTime(),
        "currentIngredientCount": 0,
        "dates": []
    },
    {
        "id": "2",
        "title": "Meal plan 2",
        "startDate": tomorrow.getTime(),
        "endDate": nextMonth.getTime(),
        "currentIngredientCount": 0,
        "dates": []
    },
    {
        "id": "3",
        "title": "Meal plan 3",
        "startDate": lastWeek.getTime(),
        "endDate": yesterday.getTime(),
        "currentIngredientCount": 0,
        "dates": []
    },
    {
        "id": "4",
        "title": "Meal plan 4",
        "startDate": lastMonth.getTime(),
        "endDate": lastWeek.getTime(),
        "currentIngredientCount": 0,
        "dates": []
    }
] // TODO: use real data

const mealPlansSlice = createSlice({
    name: "mealPlans",
    initialState,
    reducers: {
        mealPlanAdded: (state, { payload }: PayloadAction<IMealPlan>) => {
            state.push(payload)
        },
        mealPlanRenamed: (state, { payload: { mealPlanId, title } }: PayloadAction<{ mealPlanId: string, title: string }>) => {
            return state.map(mealPlan => mealPlan.id === mealPlanId ? {
                ...mealPlan,
                title,
            } : mealPlan)
        },
        mealPlanDateRangeChanged: (state, { payload: { mealPlanId, startDate, endDate } }: PayloadAction<{ mealPlanId: string, startDate: number, endDate: number }>) => {
            return state.map(mealPlan => mealPlan.id === mealPlanId ? {
                ...mealPlan,
                startDate,
                endDate,
            } : mealPlan)
        },
        mealPlanDateMealsChanged: (state, { payload: { mealPlanId, dateId, meals } }: PayloadAction<{ mealPlanId: string, dateId: string, meals: IMealPlanDateMeal[] }>) => {
            return state.map(mealPlan => {
                const hasDate = mealPlan.dates.find(date => date.id === dateId)
                if (hasDate) {
                    return mealPlan.id === mealPlanId ? {
                        ...mealPlan,
                        dates: mealPlan.dates.map(date => date.id === dateId ? {
                            ...date,
                            meals
                        } : date)
                    } : mealPlan
                } else {
                    return mealPlan.id === mealPlanId ? {
                        ...mealPlan,
                        dates: [...mealPlan.dates, { id: dateId, meals }],
                    } : mealPlan
                }
            })
        },
        mealPlanDateNoteChanged: (state, { payload: { mealPlanId, dateId, note } }: PayloadAction<{ mealPlanId: string, dateId: string, note: string }>) => {
            return state.map(mealPlan => {
                const hasDate = mealPlan.dates.find(date => date.id === dateId)
                if (hasDate) {
                    return mealPlan.id === mealPlanId ? {
                        ...mealPlan,
                        dates: mealPlan.dates.map(date => date.id === dateId ? {
                            ...date,
                            note
                        } : date)
                    } : mealPlan
                } else {
                    return mealPlan.id === mealPlanId ? {
                        ...mealPlan,
                        dates: [...mealPlan.dates, { id: dateId, meals: [], note }],
                    } : mealPlan
                }
            })

        },
        mealPlanDateMealServingChanged: (state, { payload: { mealPlanId, dateId, mealId, servingCount } }: PayloadAction<{ mealPlanId: string, dateId: string, mealId: string, servingCount: number }>) => {
            if (servingCount <= 0) {
                return state.map(mealPlan => mealPlan.id === mealPlanId ? {
                    ...mealPlan,
                    dates: mealPlan.dates.map(date => date.id === dateId ? {
                        ...date,
                        meals: date.meals.filter(meal => meal.id !== mealId)
                    } : date),
                } : mealPlan)
            }

            return state.map(mealPlan => mealPlan.id === mealPlanId ? {
                ...mealPlan,
                dates: mealPlan.dates.map(date => date.id === dateId ? {
                    ...date,
                    meals: date.meals.map(meal => meal.id === mealId ? {
                        ...meal,
                        servingCount
                    } : meal)
                } : date),
            } : mealPlan)
        },
    }
})

export const { mealPlanAdded, mealPlanRenamed, mealPlanDateRangeChanged, mealPlanDateMealsChanged, mealPlanDateNoteChanged, mealPlanDateMealServingChanged } = mealPlansSlice.actions
export default mealPlansSlice.reducer