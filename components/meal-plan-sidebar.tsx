"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbList,
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

import { ReactNode } from "react"
import { useAppSelector } from "@/lib/hooks"

interface Props {
    children: ReactNode
    breadcrumbs: ReactNode
    showMobileAddNew?: boolean
}

export default function MealPlanSidebar({ children, breadcrumbs, showMobileAddNew }: Props) {
    const mealPlans = useAppSelector(state => state.mealPlans)
    
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
                                <Button>
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
                        <BreadcrumbList className="md:hidden">
                            {breadcrumbs}
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className={`ml-auto pl-2 md:hidden ${showMobileAddNew ? "" : "opacity-0 pointer-events-none"}`}>
                        <Button className="text-xs" tabIndex={showMobileAddNew ? 1 : 0}>
                            <Plus /> Add new
                        </Button>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
