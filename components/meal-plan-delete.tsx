import { useState } from "react"
import { useRouter } from "next/navigation"
import { Ban, Trash2 } from "lucide-react"

import Dialog from "@/components/dialog"
import { DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IMealPlan } from "@/types/IMealPlan"
import { useAppDispatch } from "@/lib/hooks"
import { mealPlanDeleted } from "@/app/reducers/mealPlansSlice"
import { getMealPlanTitle } from "@/lib/utils"

interface Props {
    mealPlan: IMealPlan
}

export default function MealPlanDelete({
    mealPlan
}: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useAppDispatch()
    const router = useRouter()

    return (
        <Dialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            button={(
                <Button variant="destructive" className="w-full sm:w-auto">
                    <Trash2 />
                    <span>Delete meal plan</span>
                </Button>
            )}
            title={`Delete meal plan "${getMealPlanTitle(mealPlan)}"?`}
        >
            <DialogDescription>Are you sure?</DialogDescription>
            <div className="grid grid-cols-2 gap-2 pt-4">
                <Button 
                    onClick={() => setIsOpen(false)}
                    className="w-full" 
                    variant="outline"
                >
                    <Ban />
                    <span>Cancel</span>
                </Button>
                <Button 
                    onClick={() => {
                        dispatch(mealPlanDeleted({ mealPlanId: mealPlan.id }))
                        router.push(`/meal-plans`)
                    }}
                    className="w-full" 
                    variant="destructive"
                >
                    <Trash2 />
                    <span>Delete</span>
                </Button>
            </div>
        </Dialog>
    )
}