import { IRecipe } from "@/types/IRecipe"
import { DndContext } from "@dnd-kit/core"
import MealDropperDropper from "@/components/meal-plan-organiser-dropper"
import MealPlanOrganiserDragger from "@/components/meal-plan-organiser-dragger"

interface Props {
    recipes: IRecipe[]
}

export default function MealPlanOrganiser({ recipes }: Props) {
    return (
        <DndContext>
            <div>
                <div>
                    <MealDropperDropper 
                        id="breakfast"
                        title="Breakfast"
                    >
                        <MealPlanOrganiserDragger id="1">
                            <>Recipe 1</>
                        </MealPlanOrganiserDragger>
                    </MealDropperDropper>
                </div>
                <div>
                    <MealDropperDropper 
                        id="lunch"
                        title="Lunch"
                    >
                        <MealPlanOrganiserDragger id="2">
                            <>Recipe 2</>
                        </MealPlanOrganiserDragger>
                    </MealDropperDropper>
                </div>
                <div>
                    <MealDropperDropper 
                        id="dinner"
                        title="Dinner"
                    >
                        <MealPlanOrganiserDragger id="3">
                            <>Recipe 3</>
                        </MealPlanOrganiserDragger>
                    </MealDropperDropper>
                </div>
            </div>
        </DndContext>
    )
}
