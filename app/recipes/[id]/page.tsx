import recipes from "@/data/recipes.json"
import RecipeSidebar from "@/components/recipe-sidebar"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipe = recipes.find(i => i.id === id)

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

export async function generateStaticParams() {
  return recipes.map(recipe => ({
    id: recipe.id
  }))
}