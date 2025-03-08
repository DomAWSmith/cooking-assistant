import { CookingPot, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { useAppSelector } from "@/lib/hooks"
import { RecipeSelect } from "@/components/recipes-select"

interface Props {
    recipeIds: string[]
    onSave: (recipeIds: string[]) => void
}

export function RecipesPicker({ recipeIds, onSave }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRecipeIds, setSelectedRecipeIds] = useState(recipeIds)

    const recipes = useAppSelector(state => state.recipes)
    
    function onSubmit() {
        onSave(selectedRecipeIds)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <CookingPot />
                    <span>{recipeIds.length > 0 ? `${recipeIds.length} ${recipeIds.length === 1 ? "recipe" : "recipes"} added` : "Add recipes"}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Add recipes</DialogTitle>
                    <DialogDescription>
                        Select the recipes you'd like to include in your meal plan
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[400px] rounded-md border">
                    <RecipeSelect 
                        recipes={recipes} 
                        selectedIds={selectedRecipeIds}
                        onSelect={(recipeIds) => setSelectedRecipeIds(recipeIds)} 
                    />
                </ScrollArea>

                <DialogFooter>
                    <Button type="submit" onClick={onSubmit}>Add ({selectedRecipeIds.length})</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
