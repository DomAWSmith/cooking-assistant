import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    count: number
    min: number
    max: number
    onDecrement: () => void
    onIncrement: () => void
}

export default function ServingPicker({ count, min, max, onDecrement, onIncrement }: Props) {
    const canDelete = count <= min + 1

    return (
        <div className="w-full py-2 flex items-center gap-2 justify-start">
            <Button
                size="sm"
                variant="outline"
                className={canDelete ? "text-destructive-foreground" : ""}
                onClick={onDecrement}
            >
                {canDelete ? <Trash2 /> : <Minus />}
            </Button>
            <div className="px-2">{count} {`${count === 1 ? "serving" : "servings"}`}</div>
            <Button
                size="sm"
                variant="outline"
                className={`${count < max ? "" : "opacity-50"} transition-all`}
                onClick={onIncrement}
            ><Plus /></Button>
        </div>
    )
}
