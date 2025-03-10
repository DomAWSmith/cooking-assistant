import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/lib/hooks"
import { RecipeSelect } from "@/components/recipes-select"

interface Props {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
    title: string
    recipeIds: string[]
    onSave: (recipeIds: string[]) => void
}

export function RecipesPickerDialog({ isOpen, setIsOpen, title, recipeIds, onSave }: Props) {
    const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([])

    useEffect(() => {
        setSelectedRecipeIds(recipeIds)
    }, [recipeIds])

    const recipes = useAppSelector(state => state.recipes)
    
    function onSubmit() {
        onSave(selectedRecipeIds)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
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
