import { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"
import { MealType } from "@/types/enums/MealType"

interface Props {
    id: MealType
    isPopulated: boolean
    children: ReactNode
}

export default function MealPlanOrganiserDropper({ id, isPopulated, children }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    })

    return (
        <div ref={setNodeRef} className={`flex flex-col rounded border outline-2 ${isOver ? "outline-offset-4 bg-slate-200" : "outline-offset-0 outline-transparent"} transition-all duration-200`}>
            <div className="flex flex-col">{children}</div>
            {!isPopulated && (
                <div className="relative">
                    <div className={`transition-all duration-200 ${isOver ? "h-[87.5px]" : "h-12"}`} />
                    <div className={`absolute left-0 top-0 px-4 py-3 transition-opacity duration-200 ${isOver ? "opacity-0" : "opacity-70"}`}>Add a meal</div>
                </div>
            )}
        </div>
    )
}
