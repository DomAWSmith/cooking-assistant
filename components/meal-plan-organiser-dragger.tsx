import { useDraggable } from "@dnd-kit/core"
import { IRecipe } from "@/types/IRecipe"
import { RecipeDraggable } from "./recipe-draggable"

interface Props {
    recipe: IRecipe
}

export default function MealPlanOrganiserDragger({ recipe }: Props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: recipe.id,
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    return (
        <button 
            ref={setNodeRef} 
            style={style} 
            {...listeners} 
            {...attributes} 
            className={`${isDragging ? "rounded bg-white overflow-hidden outline outline-black/10" : "border-b last:border-b-0"}`}
        >
            <RecipeDraggable {...recipe} />
        </button>
    )
}
