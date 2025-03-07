import mealPlans from "@/data/meal-plans.json"
import MealPlanSidebar from "@/components/meal-plan-sidebar"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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
      <div className="flex flex-1 flex-col gap-4">
        <div>{pageName}</div>
      </div>
    </MealPlanSidebar>
  )
}

export async function generateStaticParams() {
  return mealPlans.map(mealPlan => ({
    id: mealPlan.id
  }))
}