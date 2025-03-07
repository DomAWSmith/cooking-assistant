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

import recipes from "@/data/recipes.json"
import { Recipes } from "@/components/recipes"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function RecipeSidebar({ children }: Props) {
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
                <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="md:hidden">
                                <BreadcrumbPage className="flex items-center">Recipes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
