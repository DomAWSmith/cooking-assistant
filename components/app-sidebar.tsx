"use client"

import * as React from "react"
import { Command, CookingPot, NotebookPen } from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { usePathname } from 'next/navigation'
import Link from "next/link"

// This is sample data
const data = {
  user: {
    name: "foo bar",
    email: "foo@bar.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Meal plans",
      url: "/meal-plans",
      icon: NotebookPen,
      isActive: false,
    },
    {
      title: "Recipes",
      url: "/recipes",
      icon: CookingPot,
      isActive: true,
    },
  ]
}

interface Props extends React.ComponentProps<typeof Sidebar> {
  listHeader?: React.ReactNode
  list?: React.ReactNode
}

export function AppSidebar({ listHeader, list, ...props }: Props) {
  const pathname = usePathname()
  
  const { setOpen } = useSidebar()

  const showSecondarySideBar = listHeader !== undefined || list !== undefined

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <Link href="/">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Cooking Assistant</span>
                    <span className="truncate text-xs">Free</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => setOpen(true)}
                      isActive={pathname === item.url}
                      className="px-2.5 md:px-2"
                      asChild
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      {showSecondarySideBar && (
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="gap-3.5 border-b p-4">
            {listHeader}
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0 flex flex-col h-full">
              <SidebarGroupContent className="flex flex-col h-full">
                {list}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  )
}
