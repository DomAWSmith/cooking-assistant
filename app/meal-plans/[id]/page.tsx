"use client"

import MealPlanSidebar from "@/components/meal-plan-sidebar"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"

export default function Page() {
  const { id } = useParams<{ id: string }>()

  const mealPlans = useAppSelector(state => state.mealPlans)
  const mealPlan = mealPlans.find(i => i.id === id)

  const pageName = mealPlan?.name || "Not found"

  return (
    <MealPlanSidebar
      breadcrumbs={
        <>
          <BreadcrumbItem>
            <BreadcrumbLink href="/meal-plans" className="flex items-center">Meal plans</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">{pageName}</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
    >
      <div className="flex flex-1 flex-col gap- p-4">
        <div>{pageName}</div>
      </div>
    </MealPlanSidebar>
  )
}