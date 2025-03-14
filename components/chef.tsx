import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChefFace from "@/components/chef-face"
import { IMealPlan } from "@/types/IMealPlan"
import { getAmountOfDaysBetween, isActiveMealPlan, relativeDate } from "@/lib/utils"
import { startOfToday } from "date-fns"
import { CookingPot, NotebookPen } from "lucide-react"

interface Props {
    hasRecipes: boolean
    nextMealPlan: IMealPlan | null
}

export default function Chef({ hasRecipes, nextMealPlan }: Props) {
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
    let actionLink = ""
    let actionLabel = ""
    let actionMessage = ""
    if (!hasRecipes) {
        actionIcon = <NotebookPen />
        actionLink = `/recipes`
        actionLabel = "Create your first recipe"
        actionMessage = `Once you've created some recipes, you'll be able to plan meals`
    } else if (nextMealPlan !== null) {
        actionIcon = <CookingPot />
        actionLink = `/meal-plans/${nextMealPlan.id}`
        actionLabel = "View meal plan"

        if (isActiveMealPlan(nextMealPlan)) {
            const daysTotal = getAmountOfDaysBetween(new Date(nextMealPlan.startDate), new Date(nextMealPlan.endDate))
            const daysLeft = getAmountOfDaysBetween(startOfToday(), new Date(nextMealPlan.endDate))

            if (daysTotal === daysLeft) {
                actionMessage = `You have <strong>${nextMealPlan.title}</strong> starting today for ${daysLeft} days`
            } else if (daysLeft) {
                actionMessage = `Today is your last day of <strong>${nextMealPlan.title}</strong>`
            } else {
                actionMessage = `You have ${daysLeft} of ${daysTotal} days left of <strong>${nextMealPlan.title}</strong>`
            }

        } else {
            actionMessage = `You have <strong>${nextMealPlan.title}</strong> ${relativeDate(now, new Date(nextMealPlan.startDate))}`
        }
    } else {
        actionIcon = <CookingPot />
        actionLink = `/meal-plans`
        actionLabel = "Create your first meal plan"
        actionMessage = `You have no meals planned`
    }

    return (
        <div className="flex flex-col items-center justify-center relative z-10">
            <ChefFace className="mb-6" />
            <div className="relative mb-4">
                <div className="bg-foreground px-4 pt-3 pb-4 text-background rounded-lg text-lg max-w-xl border-3 relative z-10 border-transparent"
                    dangerouslySetInnerHTML={{ __html: `${welcomeMessage}, it's ${formattedDate}! ${actionMessage}.` }}
                />
                <div className="bg-foreground pointer-events-none w-4 h-4 absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45" />
            </div>
            <Button variant="outline" asChild>
                <Link href={actionLink}>
                    {actionIcon}
                    <span>{actionLabel}</span>
                </Link>
            </Button>
        </div>
    )
}
