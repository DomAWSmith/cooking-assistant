import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addDays } from "date-fns"
import { IMealPlan } from "@/types/IMealPlan"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { generateId, getAmountOfDaysBetween, getDateId } from "@/lib/utils"
import { IMealPlanDate } from "@/types/IMealPlanDate"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"

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
        id: '80c06901-d752-433c-9f36-33699dc27320',
        title: '',
        startDate: 1742169600000,
        endDate: 1742688000000,
        dates: [
            {
                id: '17-2-2025',
                meals: []
            },
            {
                id: '18-2-2025',
                meals: []
            },
            {
                id: '19-2-2025',
                meals: []
            },
            {
                id: '20-2-2025',
                meals: []
            },
            {
                id: '21-2-2025',
                meals: []
            },
            {
                id: '22-2-2025',
                meals: []
            },
            {
                id: '23-2-2025',
                meals: []
            }
        ],
        shoppingIngredients: []
    },
    {
        id: '9e22458e-d5ca-4e84-b0f0-3fe7f6f479b5',
        title: '',
        startDate: 1742860800000,
        endDate: 1743033600000,
        dates: [
            {
                id: '25-2-2025',
                meals: [
                    {
                        id: '1db97244-d780-4c10-b5cb-ed108c38ccd6',
                        recipeId: '1',
                        servingCount: 2
                    },
                    {
                        id: '3632d5a2-1f8a-482f-aef8-e6124bf34760',
                        recipeId: '1',
                        servingCount: 2
                    }
                ]
            },
            {
                id: '26-2-2025',
                meals: [
                    {
                        id: '2991bbdb-afd5-48d5-bb4d-e5c19d1530a4',
                        recipeId: '1',
                        servingCount: 2
                    }
                ]
            },
            {
                id: '27-2-2025',
                meals: []
            }
        ],
        shoppingIngredients: []
    }
] // TODO: use real data

const mealPlansSlice = createSlice({
    name: "mealPlans",
    initialState,
    reducers: {
        mealPlanAdded: (state, { payload }: PayloadAction<Omit<IMealPlan, "id" | "dates" | "shoppingIngredients">>) => {
            const { startDate, endDate } = payload

            let dates: IMealPlanDate[] = []
            const dayCount = getAmountOfDaysBetween(new Date(startDate), new Date(endDate))
            for (let i = 0; i <= dayCount; i++) {
                const date = addDays(new Date(startDate), i)
                const dateId = getDateId(date)

                dates = [...dates, {
                    id: dateId,
                    meals: []
                }]
            }
            dates = dates.sort((a, b) => a.id.localeCompare(b.id))

            state.push({
                ...payload,
                id: generateId(),
                startDate,
                endDate,
                dates,
                shoppingIngredients: []
            })
        },
        mealPlanRenamed: (state, { payload: { mealPlanId, title } }: PayloadAction<{ mealPlanId: string, title: string }>) => {
            return state.map(mealPlan => mealPlan.id === mealPlanId ? {
                ...mealPlan,
                title,
            } : mealPlan)
        },
        mealPlanDateRangeChanged: (state, { payload: { mealPlanId, startDate, endDate } }: PayloadAction<{ mealPlanId: string, startDate: number, endDate: number }>) => {
            // TODO - update shoppingIngredients            
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan
                
                let dates: IMealPlanDate[] = []
                const dayCount = getAmountOfDaysBetween(new Date(startDate), new Date(endDate))
                for (let i = 0; i <= dayCount; i++) {
                    const date = addDays(new Date(startDate), i)
                    const dateId = getDateId(date)

                    const existingMealPlanDate = mealPlan.dates.find(date => date.id === dateId)
                    if (existingMealPlanDate) {
                        dates = [...dates, existingMealPlanDate]
                    } else {
                        dates = [...dates, {
                            id: dateId,
                            meals: []
                        }]
                    }
                }
                dates = dates.sort((a, b) => a.id.localeCompare(b.id))

                return {
                    ...mealPlan,
                    startDate,
                    endDate,
                    dates
                }
            })
        },
        mealPlanDateMealsAdded: (state, { payload: { mealPlanId, dateId, meals } }: PayloadAction<{ mealPlanId: string, dateId: string, meals: IMealPlanDateMeal[] }>) => {
            // TODO - add to shopping list, each item should have association with a mealPlanDateMealId

            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    dates: mealPlan.dates.map(date => date.id === dateId ? {
                        ...date,
                        meals: [...date.meals, ...meals]
                    } : date)
                }
            })
        },
        mealPlanDateMealsMoved: (state, { payload: { mealPlanId, oldDateId, newDateId, meal } }: PayloadAction<{ mealPlanId: string, oldDateId: string, newDateId: string, meal: IMealPlanDateMeal }>) => {
            // TODO - consider shopping items that are marked has checked, that may now have incorrect quantities

            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    dates: mealPlan.dates.map(date => {
                        if (date.id === oldDateId) {
                            return {
                                ...date,
                                meals: date.meals.filter(({ id }) => id !== meal.id)
                            }
                        } else if (date.id === newDateId) {
                            return {
                                ...date,
                                meals: [...date.meals, meal]
                            }
                        }

                        return date
                    })
                }
            })
        },
        mealPlanDateNoteChanged: (state, { payload: { mealPlanId, dateId, note } }: PayloadAction<{ mealPlanId: string, dateId: string, note: string }>) => {
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    dates: mealPlan.dates.map(date => date.id === dateId ? {
                        ...date,
                        note
                    } : date)
                }
            })

        },
        mealPlanDateMealServingChanged: (state, { payload: { mealPlanId, dateId, mealId, servingCount } }: PayloadAction<{ mealPlanId: string, dateId: string, mealId: string, servingCount: number }>) => {
            // TODO - when a meal is removed
            // remove any ingredients that are no longer needed (consider other meals might need the ones this meal was using)

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
        mealPlanShoppingListItemAdded: (state, { payload: { mealPlanId, shoppingIngredient } }: PayloadAction<{ mealPlanId: string, shoppingIngredient: IShoppingIngredient }>) => {
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    shoppingIngredients: [...mealPlan.shoppingIngredients, shoppingIngredient]
                }
            })
        },
        mealPlanShoppingListItemRemoved: (state, { payload: { mealPlanId, shoppingListItemId } }: PayloadAction<{ mealPlanId: string, shoppingListItemId: string }>) => {
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    shoppingIngredients: mealPlan.shoppingIngredients.filter(shoppingIngredient => shoppingIngredient.id !== shoppingListItemId)
                }
            })
        },
        mealPlanShoppingListItemExpiryDateSet: (state, { payload: { mealPlanId, shoppingListItemId, expiryDate } }: PayloadAction<{ mealPlanId: string, shoppingListItemId: string, expiryDate?: number }>) => {
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    shoppingIngredients: mealPlan.shoppingIngredients.map(shoppingIngredient => {
                        if (shoppingIngredient.id !== shoppingListItemId) return shoppingIngredient

                        return {
                            ...shoppingIngredient,
                            expiryDate,
                        }

                    })
                }
            })
        }
    }
})

export const { 
    mealPlanAdded, 
    mealPlanRenamed, 
    mealPlanDateRangeChanged, 
    mealPlanDateMealsAdded,
    mealPlanDateMealsMoved,
    mealPlanDateNoteChanged, 
    mealPlanDateMealServingChanged, 
    mealPlanShoppingListItemAdded, 
    mealPlanShoppingListItemRemoved, 
    mealPlanShoppingListItemExpiryDateSet 
} = mealPlansSlice.actions
export default mealPlansSlice.reducer