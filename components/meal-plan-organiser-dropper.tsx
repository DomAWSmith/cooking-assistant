import { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"

interface Props {
    id: string
    title: string
    children: ReactNode
}

export default function MealPlanOrganiserDropper({ id, title, children }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    })
    const style = {
        color: isOver ? 'green' : undefined,
    }

    return (
        <div>
            <h2 className="mb-1 font-semibold">{title}</h2>
            <div ref={setNodeRef} style={style} className="p-4 mb-4 border rounded">
                {children}
            </div>
        </div>
    )
}
