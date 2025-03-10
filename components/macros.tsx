import { IMacros } from "@/types/IMacros"
import { Badge } from "./ui/badge"
import { formatNutritionNumber } from "@/lib/utils"

export function Macros({ protein, fats, carbs }: IMacros) {
  return (
    <div className="flex gap-2 ml-auto">
      <Badge className={`font-mono font-light ${protein ? "bg-protein text-protein-foreground" : "bg-slate-100 text-foreground"}`}>{formatNutritionNumber(protein)} P</Badge>
      <Badge className={`font-mono font-light ${fats ? "bg-fats text-fats-foreground" : "bg-slate-100 text-foreground"}`}>{formatNutritionNumber(fats)} F</Badge>
      <Badge className={`font-mono font-light ${carbs ? "bg-carbs text-carbs-foreground" : "bg-slate-100 text-foreground"}`}>{formatNutritionNumber(carbs)} C</Badge>
    </div>
  )
}
