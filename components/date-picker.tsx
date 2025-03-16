import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Eraser } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
    originalDate?: Date
    onSave: (date?: Date) => void
    label?: string
}

export function DatePicker({ originalDate, onSave, label = "Pick a date" }: Props) {
    const [date, setDate] = useState<Date | undefined>(originalDate)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) onSave(date)

    }, [isOpen])

    return (
        <div className={cn("grid gap-2")}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-center font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date ? (
                            format(date, "LLL dd, y")
                        ) : (
                            <span>{label}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end" blockOutside={true}>
                    <Calendar
                        mode="single"
                        defaultMonth={date}
                        selected={date}
                        onSelect={(date) => {
                            setDate(date)
                            setIsOpen(false)
                        }}
                        numberOfMonths={1}
                    />
                    <div className="p-3 pt-0">
                        <Button 
                            className="w-full" 
                            disabled={!date}
                            onClick={() => {
                                setDate(undefined)
                                setIsOpen(false)
                            }}
                        >
                            <Eraser />
                            <span>Reset</span>
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}