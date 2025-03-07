import { MealPlans } from "@/components/meal-plans"
import mealPlans from "@/data/meal-plans.json"
import MealPlanSidebar from "@/components/meal-plan-sidebar"
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function Page() {
  return (
    <MealPlanSidebar 
      breadcrumbs={
        <>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">Meal plans</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
      showMobileAddNew={true}
    >
      <div className="md:hidden">
        <MealPlans mealPlans={mealPlans} />
      </div>
    </MealPlanSidebar>
  )
}
