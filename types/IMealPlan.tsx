import { IMealPlanDate } from "@/types/IMealPlanDate"

export interface IMealPlan {
    id: string
    title: string
    startDate: number
    endDate: number

    dates: IMealPlanDate[]
}