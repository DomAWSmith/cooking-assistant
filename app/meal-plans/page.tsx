import { MealPlans } from "@/components/meal-plans"
import mealPlans from "@/data/meal-plans.json"
import MealPlanSidebar from "@/components/meal-plan-sidebar"

export default function Page() {
  return (
    <MealPlanSidebar>
      <div className="md:hidden">
        <MealPlans mealPlans={mealPlans} />
      </div>
    </MealPlanSidebar>
  )
}
