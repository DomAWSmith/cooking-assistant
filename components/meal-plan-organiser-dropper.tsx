import { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"

interface Props {
    id: string
    isPopulated: boolean
    children: ReactNode
}

export default function MealPlanOrganiserDropper({ id, isPopulated, children }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    })

    return (
        <div ref={setNodeRef} className={`flex flex-col rounded rounded-b-none border outline-2 ${isOver ? "outline-offset-4 bg-slate-200" : "outline-offset-0 outline-transparent"} transition-all duration-200`}>
            <div className="flex flex-col">{children}</div>
            <div className={`px-4 ${isPopulated ? "h-0" : "h-12"}`} />
        </div>
    )
}