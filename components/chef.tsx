import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChefFace from "@/components/chef-face"
import { ReactElement } from "react"

interface Props {
    message: string
    action?: {
        cb: () => void,
        icon: ReactElement,
        label: string
    }
}

export default function Chef({ message, action }: Props) {
    return (
        <div className="flex flex-col items-center justify-center">
            <ChefFace className="mb-6" />
            <div className="relative mb-4">
                <div className="bg-foreground px-5 py-2 text-background rounded-lg max-w-xl border-3 relative z-10 border-transparent"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
                <div className="bg-foreground pointer-events-none w-4 h-4 absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45" />
            </div>
            {action && (
                <Button 
                    onClick={() => action.cb()}
                    variant="outline"
                >
                    {action.icon}
                    <span>{action.label}</span>
                </Button>
            )}
        </div>
    )
}
