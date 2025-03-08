import recipes from "@/data/recipes.json"
import { Recipes } from "@/components/recipes"
import RecipeSidebar from "@/components/recipe-sidebar"
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function Page() {
  return (
    <RecipeSidebar 
      breadcrumbs={
        <>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">Recipes</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      }
      showMobileAddNew={true}
    >
      <div className="md:hidden flex flex-col h-full">
        <Recipes recipes={recipes} />
      </div>
    </RecipeSidebar>
  )
}
