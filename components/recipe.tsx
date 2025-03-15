import { CircleAlert, Flame } from "lucide-react"
import { IRecipe } from "@/types/IRecipe"
import { Badge } from "@/components/ui/badge"
import { Macros } from "@/components/macros"
import ServingPicker, { Props as ServingPickerProps } from "@/components/serving-picker"
import { getDateFromDateId, getRecipeNutritionByServing } from "@/lib/utils"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"
import { useAppSelector } from "@/lib/hooks"

interface Props {
  recipe: IRecipe
  mealData?: {
    serving: ServingPickerProps
    dateIngredients: IShoppingIngredient[]
    dateId: string
  }
}

export function Recipe({ recipe, mealData }: Props) {
  const ingredients = useAppSelector(state => state.ingredients)
  const nutrition = getRecipeNutritionByServing(recipe, ingredients, mealData?.serving?.count || 1)

  if (mealData) {
    const { serving, dateIngredients, dateId } = mealData
    const date = getDateFromDateId(dateId)

    let ingredientAlerts: { id: string, name: string, message: string }[] = []

    recipe.ingredients.forEach(({ id, quantity }) => {
      const ingredient = ingredients.find(ingredient => ingredient.id === id)
      if (!ingredient) return

      const dateIngredient = dateIngredients.find((dateIngredients => dateIngredients.id === id))
      if (!dateIngredient) {
        ingredientAlerts.push({
          id: `${id}-required`,
          name: ingredient.name,
          message: "required"
        })
        return;
      }

      if (dateIngredient.quantity < quantity) {
        ingredientAlerts.push({
          id: `${id}-insufficient`,
          name: ingredient.name,
          message: `needs ${quantity - dateIngredient.quantity}g more`
        })
        return;
      }
    })


    return (
      <div className="flex w-full flex-col gap-2">
        <div className="flex gap-4 mb-2 justify-between">
          <div className="overflow-hidden truncate max-w-48 text-base font-semibold">{recipe.name}</div>
          {serving && (
            <ServingPicker
              {...serving}
            />
          )}
        </div>
        {ingredientAlerts.length > 0 && (
          <div className="basis-0 mb-4 w-full flex flex-row rounded-lg border px-4 py-3 bg-foreground/5">
            <CircleAlert className="shrink-0 text-lg mr-2" />
            <div className="flex flex-col flex-wrap">
              {ingredientAlerts.map(({ id, name, message }) => (
                <div key={id} className="pb-1"><span className="mr-1">{name}</span> <span className="opacity-50">{message}</span></div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 justify-end">
          <Badge className="font-mono font-light" variant="outline">{nutrition.calories} <Flame /></Badge>
          <Macros macros={nutrition.macros} />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="overflow-hidden truncate max-w-48 font-semibold">{recipe.name}</div>
        <div className="text-xs shrink-0">{recipe.date}</div>
      </div>
      <div className="flex w-full gap-2 pt-2 justify-between">
        <Badge className="font-mono font-light" variant="outline">{nutrition.calories} <Flame /></Badge>
        <Macros macros={nutrition.macros} />
      </div>
    </>
  )
}
