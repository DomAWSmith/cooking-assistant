import { ReactNode, useState } from "react"

import {
    Dialog as DialogUI,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    button: ReactNode
    title: string
    children: ReactNode
}

export default function Dialog({ 
    isOpen,
    setIsOpen,
    button,
    title,
    children
}: Props) {
    return (
        <DialogUI open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {button}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </DialogUI>
    )
}