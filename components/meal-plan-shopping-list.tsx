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
import { mealPlanShoppingListItemUpdated } from "@/app/reducers/mealPlansSlice"
import { CheckedState } from "@/types/enums/CheckedState"

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

    const ingredients = useAppSelector(state => state.ingredients)

    const ingredientGroups: IShoppingIngredientGroup[] = []
    mealPlan.shoppingIngredients.forEach(shoppingIngredient => {
        const ingredient = ingredients.find(({ id }) => id === shoppingIngredient.ingredientId)
        if (!ingredient) return

        const ingredientRequired = {
            ...shoppingIngredient,
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
                                    <ul className="flex flex-col gap-2 px-1">
                                        {group.ingredients.map(shoppingIngredient => {
                                            const { id, ingredient, checkedState, expiryDate, quantity } = shoppingIngredient
                                            const { name } = ingredient

                                            return (
                                                <li key={id} className="flex items-start gap-2">
                                                    <Checkbox 
                                                        id={id}
                                                        checked={[CheckedState.CHECKED, CheckedState.INVALIDATED].includes(checkedState)} 
                                                        onClick={() => {
                                                            let newCheckedState = checkedState
                                                            switch (checkedState) {
                                                                case CheckedState.UNCHECKED:
                                                                case CheckedState.INVALIDATED:
                                                                    newCheckedState = CheckedState.CHECKED
                                                                    break;
                                                                case CheckedState.CHECKED:
                                                                    newCheckedState = CheckedState.UNCHECKED
                                                                    break;
                                                            }

                                                            dispatch(mealPlanShoppingListItemUpdated({
                                                                mealPlanId: mealPlan.id,
                                                                shoppingIngredient: {
                                                                    ...shoppingIngredient,
                                                                    checkedState: newCheckedState
                                                                }
                                                            }))
                                                        }}
                                                        className={`mt-2.5 ${checkedState === CheckedState.INVALIDATED ? "opacity-25" : ""}`}
                                                    />
                                                    <label htmlFor={id} className="mt-1.5 grow">{name}</label>
                                                    <div className="ml-auto flex items-center gap-4">
                                                        <div className={`${checkedState !== CheckedState.UNCHECKED ? "" : "opacity-0 pointer-events-none"}`}>
                                                            <DatePicker
                                                                originalDate={expiryDate ? new Date(expiryDate) : undefined}
                                                                onSave={date => {
                                                                    dispatch(mealPlanShoppingListItemUpdated({
                                                                        mealPlanId: mealPlan.id,
                                                                        shoppingIngredient: {
                                                                            ...shoppingIngredient,
                                                                            expiryDate: date ? date.getTime() : undefined
                                                                        }
                                                                    }))
                                                                }}
                                                                label="Set expiry"
                                                                dateDisplayFormat="LLL dd"
                                                            />
                                                        </div>
                                                        <div className="font-mono">{quantity}g</div>
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
