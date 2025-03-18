import { addDays, nextMonday, startOfYesterday } from "date-fns";
import { useAppDispatch } from "@/lib/hooks";
import { generateId, getMealPlanTitle } from "@/lib/utils";
import { mealPlanAdded } from "@/app/reducers/mealPlansSlice";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";

export const createMealPlan = (dispatch: ReturnType<typeof useAppDispatch>, router?: ReturnType<typeof useRouter>) => {
  const yesterday = startOfYesterday()
  const startDate = nextMonday(yesterday)

  const id = generateId()

  const mealPlan = {
    id,
    title: "",
    startDate: startDate.getTime(),
    endDate: addDays(startDate, 6).getTime(),
  }

  dispatch(mealPlanAdded(mealPlan))

  toast.success(`Created meal plan "${getMealPlanTitle({
    ...mealPlan,
    dates: [],
    shoppingIngredients: []
  })}"`)

  if (router) router.push(`/meal-plans/${id}`)
}