'use client'
import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd, LucideClipboardList } from "lucide-react"
import Link from "next/link"
import { GrArticle } from "react-icons/gr";
import { RiShieldStarLine } from "react-icons/ri";
import { NavUser } from "./NavUser"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AiOutlineProduct } from "react-icons/ai";
import { LuContactRound } from "react-icons/lu";

const data = {
    navMain: [
        {
            title: "Home",
            url: "/",
            icon: LucideClipboardList,
        },
        {
            title: "Sales",
            url: "/sales",
            icon: LucideClipboardList,
        },
        {
            title: "Articles",
            url: "/articles",
            icon: GrArticle,
        },
        {
            title: "Reviews",
            url: "/reviews",
            icon: RiShieldStarLine,
        },
        {
            title: "Products",
            url: "/products",
            icon: AiOutlineProduct,
        },
        {
            title: "Contact",
            url: "/contact",
            icon: LuContactRound,
        },
    ],
}

export function AppSidebar({ ...props }) {
    const router = useRouter()
    const session = useSession()
    const pathname = usePathname()

    return (
        pathname != '/login' ? (
            <Sidebar {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <a href="#">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <GalleryVerticalEnd className="size-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">Admin Panel</span>
                                        <span className="">v1.0.0</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup >
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild size="lg" isActive={item.isActive}>
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
                <SidebarRail />
                <SidebarFooter>
                    {
                        session?.data?.user && <NavUser user={session?.data?.user} />
                    }
                </SidebarFooter>
            </Sidebar>
        ) : null
    )
}
