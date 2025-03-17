import { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"

interface Props {
    id: string
    children: ReactNode
}

export default function MealPlanOrganiserDropper({ id, children }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    })

    return (
        <div 
            ref={setNodeRef} 
            className={`flex flex-col rounded border outline-2 ${isOver ? "outline-offset-4 bg-slate-200 dark:bg-slate-200/50" : "outline-offset-0 outline-transparent"} transition-all duration-200`}
        >
            {children}
        </div>
    )
}