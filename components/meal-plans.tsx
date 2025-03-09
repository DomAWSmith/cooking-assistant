"use client"

import { IMealPlan } from "@/types/IMealPlan"
import { MealPlan } from "@/components/meal-plan";

export function MealPlans({ mealPlans }: { mealPlans: IMealPlan[] }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let activePlans: IMealPlan[] = []
  let inactivePlans: IMealPlan[] = []
  mealPlans.forEach(mealPlan => {
    if (mealPlan.startDate >= today.getTime() || (mealPlan.startDate < today.getTime() && mealPlan.endDate >= today.getTime())) {
      activePlans.push(mealPlan)
    } else {
      inactivePlans.push(mealPlan)
    }
  })

  if (!mealPlans.length) {
    return (
      <div className="text-center py-4">No meal plans</div>
    )
  }

  return (
    <>
      {
        activePlans
          .sort((a, b) => a.startDate - b.startDate)
          .map((mealPlan) => <MealPlan key={mealPlan.id} {...mealPlan} />)
      }
      {inactivePlans.length > 0 && (
        <>
          <div className="text-center border-b pt-24 pb-4 mt-auto">Past plans</div>
          {
            inactivePlans
              .sort((a, b) => b.startDate - a.startDate)
              .map((mealPlan) => <MealPlan key={mealPlan.id} {...mealPlan} />)
          }
        </>
      )}
    </>
  )
}
