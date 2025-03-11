"use client"

import { ReactNode, useEffect } from "react"

interface Props {
    children: ReactNode
}

export default function ClientPreferences({children }: Props) {

    const setDarkMode = (isDark: boolean) => {
        document.body.classList.toggle("dark", isDark)
    }

    useEffect(() => {
        setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)

        const onSelectMode = (e: MediaQueryListEvent) => setDarkMode(e.matches)
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSelectMode)
        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onSelectMode)
        }
    }, [])

    return children
}
