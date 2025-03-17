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

const initialState: IMealPlan[] = [] // TODO: use real data

const mealPlansSlice = createSlice({
    name: "mealPlans",
    initialState,
    reducers: {
        mealPlanAdded: (state, { payload }: PayloadAction<Omit<IMealPlan, "dates" | "shoppingIngredients">>) => {
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
            // TODO - move meals from dates outside of range to last new date inside range

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
        mealPlanDateMealsAdded: (state, { payload: { mealPlanId, dateId, meals, shoppingIngredients } }: PayloadAction<{ mealPlanId: string, dateId: string, meals: IMealPlanDateMeal[], shoppingIngredients: IShoppingIngredient[] }>) => {
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    dates: mealPlan.dates.map(date => date.id === dateId ? {
                        ...date,
                        meals: [...date.meals, ...meals]
                    } : date),
                    shoppingIngredients
                }
            })
        },
        mealPlanDateMealsMoved: (state, { payload: { mealPlanId, oldDateId, newDateId, meal } }: PayloadAction<{ mealPlanId: string, oldDateId: string, newDateId: string, meal: IMealPlanDateMeal }>) => {
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
        mealPlanDateMealServingChanged: (state, { payload: { mealPlanId, dateId, mealId, servingCount, shoppingIngredients } }: PayloadAction<{ mealPlanId: string, dateId: string, mealId: string, servingCount: number, shoppingIngredients: IShoppingIngredient[] }>) => {
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan
                
                let newDates: IMealPlanDate[] = []     
                if (servingCount > 0) {
                    // update meal
                    newDates = mealPlan.dates.map(date => {
                        if (date.id !== dateId) return date

                        return {
                            ...date,
                            meals: date.meals.map(meal => {
                                if (meal.id !== mealId) return meal

                                return {
                                    ...meal,
                                    servingCount
                                }
                            })
                        }
                    })
                } else {
                    // remove meal
                    newDates = mealPlan.dates.map(date => {
                        if (date.id !== dateId) return date

                        return {
                            ...date,
                            meals: date.meals.filter(meal => meal.id !== mealId)
                        }
                    })
                }

                return {
                    ...mealPlan,
                    dates: newDates,
                    shoppingIngredients
                }
            })
        },
        mealPlanShoppingListItemUpdated: (state, { payload: { mealPlanId, shoppingIngredient } }: PayloadAction<{ mealPlanId: string, shoppingIngredient: IShoppingIngredient }>) => {
            return state.map(mealPlan => {
                if (mealPlan.id !== mealPlanId) return mealPlan

                return {
                    ...mealPlan,
                    shoppingIngredients: mealPlan.shoppingIngredients.map(ingredient => {
                        if (ingredient.id !== shoppingIngredient.id) return ingredient

                        return shoppingIngredient
                    })
                }
            })
        },
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
    mealPlanShoppingListItemUpdated,
} = mealPlansSlice.actions
export default mealPlansSlice.reducer