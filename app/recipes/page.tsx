import recipes from "@/data/recipes.json"
import { Recipes } from "@/components/recipes"
import RecipeSidebar from "@/components/recipe-sidebar"

export default function Page() {
  return (
    <RecipeSidebar>
      <div className="md:hidden">
        <Recipes recipes={recipes} />
      </div>
    </RecipeSidebar>
  )
}
