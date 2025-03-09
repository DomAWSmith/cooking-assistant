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

export function MealPlanShoppingList() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-amber-400 text-black hover:bg-amber-500">
                    <ShoppingBasket />
                    <span>Shopping list</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Shopping list</DialogTitle>
                    <DialogDescription>
                        By filling out ingredient expiry dates, we can help use them in time
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[400px] rounded-md border">
                    TODO: list
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
