import { addDays, nextMonday, startOfYesterday } from "date-fns";
import { useAppDispatch } from "@/lib/hooks";
import { generateId } from "@/lib/utils";
import { mealPlanAdded } from "@/app/reducers/mealPlansSlice";
import { useRouter } from "next/navigation"

export const createMealPlan = (dispatch: ReturnType<typeof useAppDispatch>, router?: ReturnType<typeof useRouter>) => {
  const yesterday = startOfYesterday()
  const startDate = nextMonday(yesterday)

  const id = generateId()

  dispatch(mealPlanAdded({
      id,
      title: "",
      startDate: startDate.getTime(),
      endDate: addDays(startDate, 6).getTime(),
  }))

  if (router) router.push(`/meal-plans/${id}`)
}