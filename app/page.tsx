import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
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
import { IMealPlan } from "@/types/IMealPlan"
import { MealPlan } from "@/components/meal-plan"

const mealPlans: IMealPlan[] = [
  {
    id: 1,
    name: "Meal plan 1",
    startDate: "5 Mar",
    endDate: "10 Mar",
    mealCount: 5
  },
  {
    id: 2,
    name: "Meal plan 2",
    startDate: "15 Feb",
    endDate: "20 Feb",
    mealCount: 3
  },
  {
    id: 3,
    name: "Meal plan 3",
    startDate: "5 Feb",
    endDate: "10 Feb",
    mealCount: 4
  }
];

export default function MealPlans() {

  const activePlans = [mealPlans[0]];
  const inactivePlans = [mealPlans[1], mealPlans[2]];

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
              <div className="text-foreground text-base font-medium">
                Meal plans
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Button>
                  <Plus /> Add new
                </Button>
              </div>
            </div>
            <SidebarInput placeholder="Type to search..." />
          </>
        )}
        list={(
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
        )}
      />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="md:hidden">
                <BreadcrumbPage className="flex items-center">Meal plans</BreadcrumbPage>
              </BreadcrumbItem>

              {/* <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All meal plans</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center">5 Mar to 10 Mar</BreadcrumbPage>
              </BreadcrumbItem> */}

            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="aspect-video h-12 w-full rounded-lg bg-muted/50"
            />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
