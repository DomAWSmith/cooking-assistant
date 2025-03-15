import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

export interface Props {
    count: number
    min: number
    max: number
    onDecrement: () => void
    onIncrement: () => void
}

export default function ServingPicker({ count, min, max, onDecrement, onIncrement }: Props) {
    const canDelete = count <= min + 1

    return (

        <Drawer>
            <DrawerTrigger>
                <Button variant="secondary" size="sm">
                    {count} {count === 1 ? "serving" : "servings"}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="w-full mx-auto max-w-xs">
                    <DrawerTitle>Change serving count</DrawerTitle>
                    <DrawerDescription>To adjust your ingredient and nutrition totals.</DrawerDescription>
                </DrawerHeader>
                <div className="w-full mx-auto max-w-xs mb-4">
                    <div className="w-full py-2 flex items-center gap-2 justify-between ">
                        <Button
                            size="icon"
                            variant="outline"
                            className={`text-xl ${canDelete ? "text-destructive-foreground" : ""}`}
                            onClick={onDecrement}
                        >
                            {canDelete ? <Trash2 /> : <Minus />}
                        </Button>
                        <div className="px-2 text-center">
                            <div className="text-8xl mb-2 font-bold">{count}</div>
                            <div className="uppercase text-sm opacity-70 font-bol font-mono">{`${count === 1 ? "serving" : "servings"}`}</div>
                        </div>
                        <Button
                            size="icon"
                            variant="outline"
                            className={`text-xl ${count < max ? "" : "opacity-50"} transition-all`}
                            onClick={onIncrement}
                        ><Plus /></Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
