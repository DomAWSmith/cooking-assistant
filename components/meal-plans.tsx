"use client"

import { IMealPlan } from "@/types/IMealPlan"
import { MealPlan } from "@/components/meal-plan";

export function MealPlans({ mealPlans }: { mealPlans: IMealPlan[] }) {
  const activePlans = [mealPlans[0], mealPlans[3]];
  const inactivePlans = [mealPlans[1], mealPlans[2]];

  return (
    <>
      {
        activePlans.map((mealPlan) => <MealPlan key={mealPlan.id} {...mealPlan} />)
      }
      {inactivePlans.length > 0 && (
        <>
          <div className="text-center border-b pt-24 pb-4 mt-auto">Past plans</div>
          {
            inactivePlans.map((mealPlan) => <MealPlan key={mealPlan.id} {...mealPlan} />)
          }
        </>
      )}
    </>
  )
}
