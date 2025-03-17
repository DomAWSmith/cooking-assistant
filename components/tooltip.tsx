import { ReactNode } from "react"
import {
    Tooltip as TooltipUI,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
    children: ReactNode
    message: string
}

export function Tooltip({ children, message }: Props) {
    return (
        <TooltipProvider>
            <TooltipUI>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    {message}
                </TooltipContent>
            </TooltipUI>
        </TooltipProvider>
    )
}
