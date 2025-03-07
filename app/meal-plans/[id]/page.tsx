import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInput,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MealPlans } from "@/components/meal-plans"

import mealPlans from "@/data/meal-plans.json"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mealPlan = mealPlans.find(i => i.id === id)

  const pageName = mealPlan?.name || "Not found"

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        listHeader={(
          <>
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium mr-2 flex-shrink-0">
                Meal plans
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Button className="text-sm">
                  <Plus /> Add new
                </Button>
              </div>
            </div>
            <SidebarInput placeholder="Type to search..." />
          </>
        )}
        list={<MealPlans mealPlans={mealPlans} />}
      />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="md:hidden">
                <BreadcrumbLink href="/meal-plans">Meal plans</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="md:hidden" />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center">{pageName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4">
          <div>{pageName}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export async function generateStaticParams() {
  return mealPlans.map(mealPlan => ({
    id: mealPlan.id
  }))
}