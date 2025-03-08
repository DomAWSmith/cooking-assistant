import { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"
import { MealType } from "@/types/enums/MealType"

interface Props {
    id: MealType
    children: ReactNode
}

export default function MealPlanOrganiserDropper({ id, children }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    })
    const style = {
        // color: isOver ? 'green' : undefined,
    }

    return (
        <div ref={setNodeRef} style={style} className="flex flex-col border rounded">
            {children}
        </div>
    )
}
