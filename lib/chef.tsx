import { CookingPot, NotebookPen } from "lucide-react"
import { getAmountOfDaysBetween, getMealPlanTitle, isActiveMealPlan, relativeDate } from "@/lib/utils"
import { startOfToday } from "date-fns"
import { IMealPlan } from "@/types/IMealPlan"
import { useRouter } from "next/navigation"
import { createMealPlan } from "@/lib/meal-plan"
import { useAppDispatch } from "@/lib/hooks"

export function generateWelcomeMessage(
  hasRecipes: boolean, 
  nextMealPlan: IMealPlan, 
  router: ReturnType<typeof useRouter>,
  dispatch: ReturnType<typeof useAppDispatch>
) {
  const now = new Date()
  const dateFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" })
  const formattedDate = dateFormatter.format(now)

  const hour = now.getHours()
  let welcomeMessage = ""
  if (hour < 12) {
    welcomeMessage = "Good morning"
  } else if (hour < 16) {
    welcomeMessage = "Good afternoon"
  } else if (hour < 24) {
    welcomeMessage = "Good evening"
  }

  let actionIcon = <></>
  let actionCb = () => {}
  let actionLabel = ""
  let actionMessage = ""
  if (!hasRecipes) {
    actionIcon = <NotebookPen />
    actionCb = () => router.push(`/recipes`)
    actionLabel = "Create your first recipe"
    actionMessage = `Once you've created some recipes, you'll be able to plan meals`
  } else if (nextMealPlan !== null) {
    const title = `meal plan <strong>${getMealPlanTitle(nextMealPlan)}</strong>`
    actionIcon = <CookingPot />
    actionCb = () => router.push(`/meal-plans/${nextMealPlan.id}`)
    actionLabel = "View meal plan"

    if (isActiveMealPlan(nextMealPlan)) {
      const daysTotal = getAmountOfDaysBetween(new Date(nextMealPlan.startDate), new Date(nextMealPlan.endDate))
      const daysLeft = getAmountOfDaysBetween(startOfToday(), new Date(nextMealPlan.endDate))

      if (daysTotal === daysLeft) {
        actionMessage = `You have ${title} starting today for ${daysLeft} days`
      } else if (daysLeft) {
        actionMessage = `Today is your last day of ${title}`
      } else {
        actionMessage = `You have ${daysLeft} of ${daysTotal} days left of ${title}`
      }

    } else {
      actionMessage = `You have ${title} ${relativeDate(now, new Date(nextMealPlan.startDate))}`
    }
  } else {
    actionIcon = <CookingPot />
    actionCb = () => createMealPlan(dispatch, router)
    actionLabel = "Create your first meal plan"
    actionMessage = `You have no meals planned`
  }

  return {
    message: `${welcomeMessage}, it's ${formattedDate}! ${actionMessage}.`,
    action: {
      cb: actionCb,
      icon: actionIcon,
      label: actionLabel
    }
  }
}