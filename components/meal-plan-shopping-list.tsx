import { ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IMealPlan } from "@/types/IMealPlan"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"
import { IIngredient } from "@/types/IIngredient"
import { Checkbox } from "@/components/ui/checkbox"
import { IIngredientType } from "@/types/IIngredientType"
import { DatePicker } from "@/components/date-picker"
import { mealPlanShoppingListItemAdded, mealPlanShoppingListItemRemoved, mealPlanShoppingListItemExpiryDateSet } from "@/app/reducers/mealPlansSlice"

interface Props {
    mealPlan: IMealPlan
    label: string
}

interface IShoppingIngredientGroup {
    type: IIngredientType
    ingredients: IShoppingIngredientRequired[]
}

interface IShoppingIngredientRequired extends IShoppingIngredient {
    ingredient: IIngredient
}

export function MealPlanShoppingList({ mealPlan, label }: Props) {
    const dispatch = useAppDispatch()

    const recipes = useAppSelector(state => state.recipes)
    const ingredients = useAppSelector(state => state.ingredients)

    const ingredientGroups: IShoppingIngredientGroup[] = []

    const ingredientsRequired: IShoppingIngredientRequired[] = []
    mealPlan.dates.forEach(date => {
        date.meals.forEach(meal => {
            const recipe = recipes.find(({ id }) => id === meal.recipeId)
            if (!recipe) return

            recipe.ingredients.forEach(recipeIngredient => {
                const ingredient = ingredients.find(({ id }) => id === recipeIngredient.id)
                if (!ingredient) return

                const ingredientRequired = {
                    id: `${date.id}-${meal.id}-${recipeIngredient.id}`,
                    ingredientId: ingredient.id,
                    quantity: recipeIngredient.quantity * meal.servingCount,
                    ingredient
                }

                const ingredientGroupIndex = ingredientGroups.findIndex(group => group.type === ingredient.type)
                if (ingredientGroupIndex === -1) {
                    ingredientGroups.push({
                        type: ingredient.type,
                        ingredients: [ingredientRequired]
                    })
                } else {
                    ingredientGroups[ingredientGroupIndex].ingredients.push(ingredientRequired)
                }

                ingredientsRequired.push()
            })
        })
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-amber-400 text-black hover:bg-amber-500">
                    <ShoppingBasket />
                    <span>{label}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Shopping list</DialogTitle>
                    <DialogDescription>
                        By filling out ingredient expiry dates, we can help use them in time
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[400px] rounded-md border">
                    {ingredientGroups.length > 0 ? (
                        <ul className="flex flex-col gap-2 px-3 py-4">

                            {ingredientGroups.map(group => (
                                <li key={group.type} className="mb-2 border-b pb-6 last:border-b-0 last:pb-0">
                                    <div className="font-bold mb-2">{group.type}</div>
                                    <ul className="flex flex-col gap-2 px-3">
                                        {group.ingredients.map(groupIngredient => {
                                            const { id, ingredient, quantity } = groupIngredient
                                            const { name } = ingredient
                                            
                                            const shoppingIngredient = mealPlan.shoppingIngredients.find(shoppingIngredient => shoppingIngredient.id === id)
                                            
                                            let isChecked = false
                                            let quantityChanged = false
                                            if (shoppingIngredient) {
                                                isChecked = shoppingIngredient.quantity >= 0
                                                quantityChanged = shoppingIngredient.quantity !== quantity // meal plan could change after checking an ingredient, so we'll indicate with a faded checkbox
                                            }

                                            return (
                                                <li key={id} className="flex items-start gap-2">
                                                    <Checkbox 
                                                        id={id}
                                                        checked={isChecked} 
                                                        onClick={() => {
                                                            if (isChecked) {
                                                                dispatch(mealPlanShoppingListItemRemoved({
                                                                    mealPlanId: mealPlan.id,
                                                                    shoppingListItemId: groupIngredient.id
                                                                }))
                                                            } else {
                                                                dispatch(mealPlanShoppingListItemAdded({
                                                                    mealPlanId: mealPlan.id,
                                                                    shoppingIngredient: groupIngredient
                                                                }))
                                                            }
                                                        }}
                                                        className={`mt-2.5 ${quantityChanged ? "opacity-25" : ""}`}
                                                    />
                                                    <label htmlFor={id} className="mt-1.5 grow">{name}</label>
                                                    <div className="ml-auto flex items-center gap-4">
                                                        <div className={`${isChecked ? "" : "opacity-0 pointer-events-none"}`}>
                                                            <DatePicker
                                                                originalDate={shoppingIngredient?.expiryDate ? new Date(shoppingIngredient.expiryDate) : undefined}
                                                                onSave={date => {
                                                                    dispatch(mealPlanShoppingListItemExpiryDateSet({
                                                                        mealPlanId: mealPlan.id,
                                                                        shoppingListItemId: groupIngredient.id,
                                                                        expiryDate: date ? date.getTime() : undefined
                                                                    }))
                                                                }}
                                                                label="Set expiry"
                                                            />
                                                        </div>
                                                        <div>{quantity}g</div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            ))}

                        </ul>
                    ) : (
                        <div className="text-center py-4">No ingredients required</div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
