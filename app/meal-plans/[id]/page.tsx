"use client"

import MealPlanSidebar from "@/components/meal-plan-sidebar"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"
import DialogRename from "@/components/dialog-rename"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { mealPlanDateRangeChanged, mealPlanRenamed } from "@/app/reducers/mealPlansSlice"
import MealPlanOrganiser from "@/components/meal-plan-organiser"
import { MealPlanShoppingList } from "@/components/meal-plan-shopping-list"
import { getDateFromDateId, getIngredientsFromMealServingCountChange, getMealPlanCounts, getMealPlanTitle } from "@/lib/utils"
import MealPlanDelete from "@/components/meal-plan-delete"
import toast from "react-hot-toast"

export default function Page() {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()

  const mealPlan = useAppSelector(state => state.mealPlans.find(i => i.id === id))
  const recipes = useAppSelector(state => state.recipes)

  const pageName = mealPlan === undefined ? "Not Found" : getMealPlanTitle(mealPlan)
  
  let pageFragment = null
  if (mealPlan) {
    const { currentIngredientCount, totalIngredientCount } = getMealPlanCounts(mealPlan, recipes)

    pageFragment = (
      <>
        <div className="flex flex-wrap justify-between gap-4 p-4">
          <div className="flex-1 md:flex-0">
            <MealPlanShoppingList 
              mealPlan={mealPlan} 
              label={`Shopping list (${currentIngredientCount}/${totalIngredientCount})`} 
            />
          </div>
          <div className="flex-1 md:flex-0">
            <DatePickerWithRange
              fromDate={new Date(mealPlan.startDate)}
              toDate={new Date(mealPlan.endDate)}
              onSave={(startDate, endDate) => {
                // delete any dates that are out of range along with
                // - meals within each date
                // - shopping ingredients for those meals
                const mealDatesToRemove = mealPlan.dates
                  .filter(mealDate => {
                    const date = getDateFromDateId(mealDate.id).getTime()

                    if (date < startDate.getTime() || date > endDate.getTime()) return true
                    return false
                  })

                let newShoppingIngredients = [...mealPlan.shoppingIngredients]
                mealDatesToRemove.forEach(mealDate => {
                  mealDate.meals.forEach(dateMeal => {
                    newShoppingIngredients = getIngredientsFromMealServingCountChange(
                      mealPlan,
                      mealDate.id,
                      dateMeal,
                      recipes,
                      0 // setting serving count to 0 deletes the meal
                    )
                  })
                })

                dispatch(mealPlanDateRangeChanged({
                  mealPlanId: id,
                  startDate: startDate.getTime(),
                  endDate: endDate.getTime(),
                  shoppingIngredients: newShoppingIngredients
                }))
              }}
            />
          </div>
        </div>

        <div className="p-4">
          <MealPlanOrganiser
            mealPlan={mealPlan}
            recipes={recipes}
          />
        </div>

        <div className="p-4 pt-12 mt-auto flex justify-end">
          <MealPlanDelete mealPlan={mealPlan} />
        </div>
      </>
    )
  }

  return (
    <MealPlanSidebar
      breadcrumbs={
        <>
          <BreadcrumbItem className="md:hidden">
            <BreadcrumbLink href="/meal-plans" className="flex items-center">Meal plans</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="md:hidden" />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">
              <DialogRename 
                originalTitle={pageName}
                onSave={(title) => {
                  dispatch(mealPlanRenamed({ mealPlanId: id, title }))

                  toast.success(`Renamed meal plan to "${title}"`)
                }}
              />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
    >
      {pageFragment}
    </MealPlanSidebar>
  )
}