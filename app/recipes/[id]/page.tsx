"use client"

import RecipeSidebar from "@/components/recipe-sidebar"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"

export default function Page() {
  const { id } = useParams<{ id: string }>()

  const recipe = useAppSelector(state => state.recipes.find(i => i.id === id))

  const pageName = recipe?.name || "Not found"

  return (
    <RecipeSidebar
      breadcrumbs={
        <>
          <BreadcrumbItem>
            <BreadcrumbLink href="/recipes" className="flex items-center">Recipes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">{pageName}</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
    >
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>{pageName}</div>
      </div>
    </RecipeSidebar>
  )
}