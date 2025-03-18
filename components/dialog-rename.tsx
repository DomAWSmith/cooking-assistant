import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import Dialog from "@/components/dialog"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { DialogFooter } from "@/components/ui/dialog"

interface Props {
    originalTitle: string
    onSave: (title: string) => void
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
})

export default function DialogRename({ originalTitle, onSave }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: originalTitle,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave(values.title)
        setIsOpen(false)
    }

    return (
        <Dialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            button={(
                <Button variant="ghost" className="max-w-56">
                    <span className="truncate overflow-hidden">{originalTitle}</span>
                    <Pencil size={16} className="ml-2" />
                </Button>
            )}
            title={`Rename "${originalTitle}"`}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit">Rename</Button>
                    </DialogFooter>
                </form>
            </Form>
        </Dialog>
    )
}