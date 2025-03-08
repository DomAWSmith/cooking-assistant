import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChefFace from "@/components/chef-face"
import { IMealPlan } from "@/types/IMealPlan"
import { isAfterToday, relativeDate } from "@/lib/utils"

interface Props {
    hasRecipes: boolean
    nextMealPlan: IMealPlan | null
}

export default function Chef({ hasRecipes, nextMealPlan }: Props) {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" })
    const formattedDate = formatter.format(now)

    const hour = now.getHours()
    let welcomeMessage = ""
    if (hour < 12) {
        welcomeMessage = "Good morning"
    } else if (hour < 16) {
        welcomeMessage = "Good afternoon"
    } else if (hour < 24) {
        welcomeMessage = "Good evening"
    }

    let actionLink = ""
    let actionLabel = ""
    let actionMessage = ""
    if (!hasRecipes) {
        actionLink = `/recipes/create`
        actionLabel = "Create your first recipe"
        actionMessage = `Once you've created some recipes, you'll be able to plan meals`
    } else if (nextMealPlan !== null) {
        actionLink = `/meal-plans/${nextMealPlan.id}`
        actionLabel = "View meal plan"

        if (isAfterToday(now, new Date(nextMealPlan.startDate))) {
            actionMessage = `You have ${nextMealPlan.title}</strong> ${relativeDate(now, new Date(nextMealPlan.startDate))}`
        } else {
            actionMessage = `You currently have <strong>${nextMealPlan.title}</strong> ending ${relativeDate(now, new Date(nextMealPlan.endDate))}`
        }
    } else {
        actionLink = `/meal-plans/create`
        actionLabel = "Create your first meal plan"
        actionMessage = `You have no meals planned`
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <ChefFace className="mb-6 -ml-4" />
            <div className="relative mb-4">
                <div className="bg-black w-4 h-4 absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 " />
                <div className="bg-black ml-2 px-4 pt-3 pb-4 text-white rounded-lg text-lg max-w-xl"
                    dangerouslySetInnerHTML={{ __html: `${welcomeMessage}, it's ${formattedDate}! ${actionMessage}.` }}
                />
            </div>
            <Button variant="outline" asChild>
                <Link href={actionLink}>
                    {actionLabel}
                </Link>
            </Button>
        </div>
    )
}
