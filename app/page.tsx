"use client"

import { useAppSelector } from "@/lib/hooks"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Chef from "@/components/chef";
import {
  SIDEBAR_WIDTH_ICON,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function MealPlans() {
  const mealPlans = useAppSelector(state => state.mealPlans)
  const recipes = useAppSelector(state => state.recipes)

  const nextMealPlans = mealPlans
    .slice()
    .sort((a, b) => a.startDate - b.startDate)

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
        <header className="md:hidden sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 h-18">
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
          <Chef 
            hasRecipes={recipes.length > 0}
            nextMealPlan={nextMealPlans[0] || null} 
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
