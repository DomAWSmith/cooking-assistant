"use client"

import MealPlanSidebar from "@/components/meal-plan-sidebar"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"
import DialogRename from "@/components/dialog-rename"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { addDays } from "date-fns"
import { mealPlanDateRangeChanged, mealPlanRenamed } from "@/app/reducers/mealPlansSlice"
import { RecipesPicker } from "@/components/recipes-picker"
import { useState } from "react"
import MealPlanOrganiser from "@/components/meal-plan-organiser"

export default function Page() {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch();

  const mealPlan = useAppSelector(state => state.mealPlans.find(i => i.id === id))
  const recipes = useAppSelector(state => state.recipes)

  const pageName = mealPlan?.title || "Not found"

  const [recipeIds, setRecipeIds] = useState<string[]>([])

  const tomorrow = addDays(new Date(), 1)
  tomorrow.setHours(0, 0, 0, 0)
  const nextWeek = addDays(new Date(), 7)
  nextWeek.setHours(0, 0, 0, 0)

  let startDate = tomorrow
  let endDate = nextWeek
  if (mealPlan) {
    startDate = new Date(mealPlan.startDate)
    endDate = new Date(mealPlan.endDate)
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
                  dispatch(mealPlanRenamed({ id, title }))
                }}
              />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
    >
      <div className="flex gap-4 p-4">
        <div>
          <RecipesPicker
            recipeIds={recipeIds}
            onSave={(recipeIds) => setRecipeIds(recipeIds)}
          />
        </div>
        <div className="ml-auto">
          <DatePickerWithRange
            fromDate={startDate}
            toDate={endDate}
            onSave={(startDate, endDate) => {
              dispatch(mealPlanDateRangeChanged({
                id,
                startDate: startDate.getTime(),
                endDate: endDate.getTime()
              }))
            }}
          />
        </div>
      </div>

      <div className="p-4">
        <MealPlanOrganiser 
          recipes={recipes.filter(recipe => recipeIds.includes(recipe.id))} 
        />
      </div>
    </MealPlanSidebar>
  )
}