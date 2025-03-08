import { ReactNode } from "react"
import { useDraggable } from "@dnd-kit/core"

interface Props {
    id: string
    children: ReactNode
}

export default function MealPlanOrganiserDragger({ id, children }: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-4 bg-black/50">
            {children}
        </button>
    )
}
