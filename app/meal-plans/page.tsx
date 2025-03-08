"use client"

import { MealPlans } from "@/components/meal-plans"
import MealPlanSidebar from "@/components/meal-plan-sidebar"
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { useAppSelector } from "@/lib/hooks"

export default function Page() {
  const mealPlans = useAppSelector(state => state.mealPlans)
  
  return (
    <MealPlanSidebar 
      breadcrumbs={
        <>
          <BreadcrumbItem className="md:hidden">
            <BreadcrumbPage className="flex items-center">Meal plans</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
      showMobileAddNew={true}
    >
      <div className="md:hidden flex flex-col h-full">
        <MealPlans mealPlans={mealPlans} />
      </div>
    </MealPlanSidebar>
  )
}
