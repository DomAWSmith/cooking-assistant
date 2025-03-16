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
import { useAppSelector } from "@/lib/hooks"
import { IShoppingIngredient } from "@/types/IShoppingIngredient"
import { generateId } from "@/lib/utils"
import { IIngredient } from "@/types/IIngredient"
import { Checkbox } from "@/components/ui/checkbox"
import { IIngredientType } from "@/types/IIngredientType"
import { DatePicker } from "@/components/date-picker"

interface Props {
    mealPlan: IMealPlan
}

interface IShoppingIngredientGroup {
    type: IIngredientType
    ingredients: IShoppingIngredientRequired[]
}

interface IShoppingIngredientRequired extends IShoppingIngredient {
    ingredient: IIngredient
}

export function MealPlanShoppingList({ mealPlan }: Props) {
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
                    id: generateId(),
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
                    <span>Shopping list</span>
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
                                            const { id, ingredient, quantity, expiryDate } = groupIngredient
                                            const { name } = ingredient
                                            const isChecked = true // TODO - action checking
            
                                            return (
                                                <li key={id} className="flex items-start gap-2">
                                                    <Checkbox checked={isChecked} className="mt-2.5" />
                                                    <div className="mt-1">{name}</div>
                                                    <div className="ml-auto flex items-center gap-4">
                                                        <div className={`${isChecked ? "" : "opacity-0 pointer-events-none"}`}>
                                                            <DatePicker
                                                                originalDate={expiryDate ? new Date(expiryDate) : undefined}
                                                                onSave={() => { }}
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
