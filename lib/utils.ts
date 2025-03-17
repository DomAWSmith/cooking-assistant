import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { startOfToday, endOfToday } from "date-fns"
import uniqid from "uniqid"
import { IMealPlan } from "@/types/IMealPlan"
import { INutrition } from "@/types/INutrition"
import { IRecipe } from "@/types/IRecipe"
import { IIngredient } from "@/types/IIngredient"
import { IMealPlanDateMeal } from "@/types/IMealPlanDateMeal"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"
import { CheckedState } from "@/types/enums/CheckedState"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  return uniqid()
}

/**
 * Get a relative date message
 * @param d1 First date
 * @param d2 Second date
 * @returns Pretty relative date (e.g. in 7 days)
 */
export function relativeDate(d1: Date, d2: Date) {
  const rtf1 = new Intl.RelativeTimeFormat("en", { 
    style: "long",
    numeric: "auto"
  })
  const oneDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round(Math.abs((d1.getTime() - d2.getTime()) / oneDay))

  return rtf1.format(diffDays, "day")
}

export function getAmountOfDaysBetween(d1: Date, d2: Date) {
  const oneDay = 24 * 60 * 60 * 1000

  return Math.round(Math.abs((d1.getTime() - d2.getTime()) / oneDay))
}

export function getUniqueArray(array: any[]) {
  return Array.from(new Set(array))
}

export function getDateId(d1: Date) {
  return `${d1.getDate()}-${d1.getMonth()}-${d1.getFullYear()}`
}

export function getDateFromDateId(dateId: string) {
  const [date, month, year] = dateId.split("-")

  const _date = new Date()
  _date.setHours(0, 0, 0, 0)
  _date.setDate(parseInt(date))
  _date.setMonth(parseInt(month))
  _date.setFullYear(parseInt(year))
  
  return _date
}

export function isActiveMealPlan(mealPlan: IMealPlan) {
  const startDate = (mealPlan.startDate)
  const endDate = (mealPlan.endDate)

  const todayStart = startOfToday().getTime()
  const todayEnd = endOfToday().getTime()

  if (endDate < todayStart) return false
  if (startDate > todayEnd) return false

  return true
}

export function getClosestUpcomingMealPlan(mealPlans: IMealPlan[]) {
  const todayStart = startOfToday().getTime()

  const upcomingMealPlans = mealPlans.filter(mealPlan => mealPlan.endDate >= todayStart)

  const mealPlansAsc = upcomingMealPlans
    .slice()
    .sort((a, b) => a.startDate - b.startDate)

  return mealPlansAsc[0] || null
}

export function getRecipeNutritionByServing(recipe: IRecipe, ingredients: IIngredient[], servingCount: number): INutrition {
  const nutrition = recipe.ingredients.reduce((prev, curr) => {
    const ingredient = ingredients.find(({ id }) => curr.id === id)
    if (!ingredient) return prev

    return {
      calories: prev.calories + ingredient.nutrition.calories,
      macros: {
        protein: prev.macros.protein + ingredient.nutrition.macros.protein,
        fats: prev.macros.fats + ingredient.nutrition.macros.fats,
        carbs: prev.macros.carbs + ingredient.nutrition.macros.carbs,
      }
    }
  }, {
    calories: 0,
    macros: {
      protein: 0,
      fats: 0,
      carbs: 0,
    }
  })

  const { calories, macros } = nutrition
  const { carbs, fats, protein } = macros

  const multiplyByServing = (value: number, servingCount: number) => {
    if (!value) return 0

    return value * servingCount
  }

  return {
    calories: multiplyByServing(calories, servingCount),
    macros: {
      carbs: multiplyByServing(carbs, servingCount),
      fats: multiplyByServing(fats, servingCount),
      protein: multiplyByServing(protein, servingCount),
    }
  }
}

export function formatNutritionNumber(value: number) {
  return Math.round(value)
}

export function getMealPlanTitle(mealPlan: IMealPlan) {
  if (mealPlan.title) return mealPlan.title
  
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long"
  })

  return dateFormatter.formatRange(mealPlan.startDate, mealPlan.endDate)
}

export const weekDayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric" })

export function getMealPlanCounts(mealPlan: IMealPlan, recipes: IRecipe[]) {
  let mealCount = 0
  let totalIngredientCount = 0
  mealPlan.dates.forEach(date => {
    mealCount += date.meals.length

    date.meals.forEach(meal => {
      const recipe = recipes.find(({ id }) => id === meal.recipeId)
      if (!recipe) return

      totalIngredientCount += recipe.ingredients.length
    })
  })

  const currentIngredientCount = mealPlan.shoppingIngredients
    .filter(({ checkedState }) => checkedState === CheckedState.CHECKED)
    .length

  return {
    mealCount,
    currentIngredientCount,
    totalIngredientCount
  }
}

export function generateShoppingIngredientsForMeals(meals: IMealPlanDateMeal[], recipes: IRecipe[]): IShoppingIngredient[] {
  return meals
    .reduce((prev, { recipeId, servingCount }) => {
      const recipe = recipes.find(recipe => recipe.id === recipeId)
      if (!recipe) return prev as IShoppingIngredient[]

      const mealIngredients: IShoppingIngredient[] = recipe.ingredients
        .map(({ id: ingredientId, quantity }) => ({
          id: generateId(),
          ingredientId,
          checkedState: CheckedState.UNCHECKED,
          quantity: quantity * servingCount
        }))
      
      return [...prev, ...mealIngredients]
    }, [] as IShoppingIngredient[])
}

/**
 * Returns new ingredient requirements based on a meal's serving count change
 * @param mealPlan Meal plan
 * @param dateId Meal plan date Id
 * @param dateMeal Meal plan date meal
 * @param recipes All recipes (at least for meal plan)
 * @param newServingCount Serving count to change for
 * @returns New shopping ingredients for meal plan
 */
export function getIngredientsFromMealServingCountChange(mealPlan: IMealPlan, dateId: string, dateMeal: IMealPlanDateMeal, recipes: IRecipe[], newServingCount: number) {
  // try to adjust unchecked items first so items that have been checked are less likely to become "invalidated"
  // e.g. user ticked that they have 10g of something which now needs to be 20g)
  let newShoppingIngredients = [...mealPlan.shoppingIngredients]
    .sort((a, b) => {
      if (a.checkedState === b.checkedState) return 0
      return a.checkedState - b.checkedState // unchecked, then invalidated, then checked
    })

  mealPlan.dates.forEach(date => {
    if (date.id !== dateId) return

    date.meals.forEach(({ id, recipeId, servingCount: oldServingCount }) => {
      if (id !== dateMeal.id) return

      const recipe = recipes.find(recipe => recipe.id === recipeId)
      if (!recipe) return []

      // update shopping ingredients 
      // by finding matching ingredients and changing their old quantity requirements to the new quantity requirements
      recipe.ingredients
        .map(({ id: ingredientId, quantity }) => {
          let recipeIngredientUpdated = false

          newShoppingIngredients = newShoppingIngredients
            .map(ingredient => {
              if (ingredient.ingredientId !== ingredientId) return ingredient
              if (ingredient.quantity !== quantity * oldServingCount) return ingredient
              if (recipeIngredientUpdated) return ingredient

              recipeIngredientUpdated = true
              return {
                ...ingredient,
                quantity: quantity * newServingCount,
                checkedState: ingredient.checkedState === CheckedState.CHECKED ? CheckedState.INVALIDATED : ingredient.checkedState
              }
            })
            .filter(ingredient => ingredient.quantity > 0)
        })
    })
  })

  return newShoppingIngredients
}