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
import { getMealPlanTitle } from "@/lib/utils"

export default function Page() {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()

  const mealPlan = useAppSelector(state => state.mealPlans.find(i => i.id === id))
  const recipes = useAppSelector(state => state.recipes)

  const pageName = mealPlan === undefined ? "Not Found" : getMealPlanTitle(mealPlan)

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
                }}
              />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
    >
     {mealPlan && (
        <>
          <div className="flex flex-wrap justify-between gap-4 p-4">
            <div className="flex-1 md:flex-0">
              <MealPlanShoppingList mealPlan={mealPlan} />
            </div>
            <div className="flex-1 md:flex-0">
              <DatePickerWithRange
                fromDate={new Date(mealPlan.startDate)}
                toDate={new Date(mealPlan.endDate)}
                onSave={(startDate, endDate) => {
                  dispatch(mealPlanDateRangeChanged({
                    mealPlanId: id,
                    startDate: startDate.getTime(),
                    endDate: endDate.getTime()
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
        </>
     )}
    </MealPlanSidebar>
  )
}