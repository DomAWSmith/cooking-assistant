import { AppSidebar } from "@/components/app-sidebar"
import Chef from "@/components/chef";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {
  SIDEBAR_WIDTH_ICON,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { IMealPlan } from "@/types/IMealPlan";
import Link from "next/link";

import mealPlans from "@/data/meal-plans"
import { isAfterToday } from "@/lib/utils";

export default function MealPlans() {

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

  let nextMealPlans: IMealPlan[] = [mealPlans[0]]; // TODO: active or upcoming plans

  let actionLink = ""
  let actionLabel = ""
  let actionMessage = ""
  if (nextMealPlans.length > 0) {
    const nextMealPlan = nextMealPlans[0]
    actionLink = `/meal-plans/${nextMealPlan.id}`
    actionLabel = "View meal plan"

    if (isAfterToday(now, nextMealPlan.startDate)) {
      actionMessage = `you have "${nextMealPlan.name}" coming up`
    } else {
      actionMessage = `you have "${nextMealPlan.name}" ongoing`
    }


  } else {
    actionLink = `/meal-plans/create`
    actionLabel = "Create meal plan"
    actionMessage = `you have no meals planned`
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="md:hidden sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1 md:hidden" />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center">{"Welcome"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex h-full w-full items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center">
            <Chef className="mb-4 -ml-4" />
            <div className="relative mb-4">
              <div className="bg-black w-4 h-4 absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 " />
              <div className="bg-black ml-2 px-4 py-2 text-white rounded-lg text-lg">
                {welcomeMessage}! It's {formattedDate}, {actionMessage}.
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href={actionLink}>
                {actionLabel}  
              </Link>
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
