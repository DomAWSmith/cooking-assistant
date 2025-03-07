"use client"

import { IRecipe } from "@/types/IRecipe"
import { Recipe } from "@/components/recipe"

export function Recipes({ recipes }: { recipes: IRecipe[] }) {
  return (
    <>
      {
        recipes.map((recipe) => <Recipe key={recipe.id} {...recipe} />)
      }
    </>
  )
}
