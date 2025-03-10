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

import { Recipes } from "@/components/recipes"
import { ReactNode } from "react"
import { useAppSelector } from "@/lib/hooks"

interface Props {
    children: ReactNode
    breadcrumbs: ReactNode
    showMobileAddNew?: boolean
}

export default function RecipeSidebar({ children, breadcrumbs, showMobileAddNew }: Props) {
    const recipes = useAppSelector(state => state.recipes)

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
                list={<Recipes recipes={recipes} />}
            />
            <SidebarInset>
                <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 h-18 z-10">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList className="md:hidden">
                            {breadcrumbs}
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className={`ml-auto pl-2 md:hidden ${showMobileAddNew ? "" : "hidden"}`}>
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
