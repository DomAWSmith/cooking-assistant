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
import { Badge } from "@/components/ui/badge"
import { Flame, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const recipes = [
  {
    id: 1,
    name: "Recipe 1",
    date: "Yesterday",
    calories: 415,
    carbs: 15,
    fats: 5.2,
    protein: 10,
  },
  {
    id: 2,
    name: "Recipe 2",
    date: "A week ago",
    calories: 244,
    carbs: 40,
    fats: 40,
    protein: 20.2,
  }
];

export default function Recipes() {
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
                Recipes
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
              recipes.map((recipe) => (
                <a
                  href="#"
                  key={recipe.id}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{recipe.name}</span>{" "}
                    <span className="ml-auto text-xs">{recipe.date}</span>
                  </div>
                  <div className="flex w-full gap-2 pt-2">
                    <Badge className="font-mono font-light" variant="outline">{recipe.calories} <Flame /></Badge>
                    <div className="flex gap-2 ml-auto">
                      <Badge className="font-mono font-light bg-protein text-protein-foreground">{recipe.protein} P</Badge>
                      <Badge className="font-mono font-light bg-fats text-fats-foreground">{recipe.fats} F</Badge>
                      <Badge className="font-mono font-light bg-carbs text-carbs-foreground">{recipe.carbs} C</Badge>
                    </div>
                  </div>
                </a>
              ))
            }
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
                <BreadcrumbPage className="flex items-center">Recipes</BreadcrumbPage>
              </BreadcrumbItem>

              {/* <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Recipes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Recipe #1</BreadcrumbPage>
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
