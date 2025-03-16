import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { Input } from "./ui/input"

interface Props {
    originalNote?: string
    onSave: (note: string) => void
}

interface FormSchema {
    note: string
}

export function MealPlanDateNoteDialog({ originalNote = "", onSave } : Props) {
    const [isOpen, setIsOpen] = useState(false)
    
    const form = useForm<FormSchema>({
        defaultValues: {
            note: originalNote,
        },
    })

    function onSubmit(values: FormSchema) {
        onSave(values.note)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Edit note</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>

                
            </DialogContent>
        </Dialog>
    )
}
