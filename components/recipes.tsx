import { IRecipe } from "@/types/IRecipe"
import { Recipe } from "@/components/recipe"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Recipes({ recipes }: { recipes: IRecipe[] }) {
  const pathname = usePathname()
  
  return (
    <>
      {
        recipes.map((recipe) => {
          const href = `/recipes/${recipe.id}`

          return (
            <Link
              key={recipe.id}
              href={href}
              className={`${pathname === href ? "bg-sidebar-accent" : "text-sidebar-accent-foreground"} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0`}
            >
              <Recipe recipe={recipe} />
            </Link>
          )
        })
      }
    </>
  )
}
